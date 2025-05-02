<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadCroppedImageRequest;
use App\Http\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function getImages(Request $request, ImageService $imgService)
    {
        // if images are not found, redirect to the upload page
        if ($imgService->getAll()->isEmpty()) {
            return redirect()->route('photos.create');
        }

        $images = $imgService->getAll();
        return Inertia::render('gallery', [
            'images' => $images,
        ]);
    }

    public function uploadPhotoView(Request $request)
    {
        return Inertia::render('photo');
    }

    public function store(Request $request)
    {
        $file = $request->file('image');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $fileName = $originalName . '_' . time() . '_original.' . $extension;

        $path = $file->storeAs('original', $fileName, 'public');

        $originalImageId = basename($path);
        return redirect()->route('photos.edit', ['imageId' => $originalImageId]);
    }

    public function editView(Request $request, $imageId)
    {
        return Inertia::render('edit', [
            'currentStep' => 2,
            'imageId' => $imageId,
        ]);
    }

    public function applyFilter(Request $request, $imageId, ImageService $imgService)
    {
        $filter = $request->input('filter');

        // Get the original image path
        $originalImagePath = Storage::disk('public')->path('original/' . $imageId);

        // Handle the "original" filter case
        if ($filter === 'original') {

            // Check if image name contains "_original"
            if (strpos($imageId, '_original') !== false) {
                // If it does, just redirect to the edit view
                return redirect()->route('photos.edit', ['imageId' => $imageId]);
            }
            // If it doesn't, append "_original" to the image name before the image extension
            $originalImageName = pathinfo($imageId, PATHINFO_FILENAME) . '_original.' . pathinfo($imageId, PATHINFO_EXTENSION);

            // Copy the original image back to the edited image path
            $editedImagePath = Storage::disk('public')->path('original/' . str_replace('_original', '', $imageId));
            copy($originalImagePath, $editedImagePath);

            return redirect()->route('photos.edit', ['imageId' => $originalImageName]);
        }

        // Apply the filter to the original image
        $filteredImage = $imgService->applyFilter($originalImagePath, $filter);

        // Save the filtered image with the edited image name (remove "_original" from the name)
        $editedImageName = str_replace('_original', '', $imageId);
        Storage::disk('public')->put('original/' . $editedImageName, (string) $filteredImage->encode());

        return redirect()->route('photos.edit', ['imageId' => $editedImageName]);
    }

    public function finish(UploadCroppedImageRequest $request, $imageId, ImageService $imgService)
    {
        $data = $request->validated();

        // Ensure the original image has the "_original" suffix
        $originalImageName = strpos($imageId, '_original') === false
            ? pathinfo($imageId, PATHINFO_FILENAME) . '_original.' . pathinfo($imageId, PATHINFO_EXTENSION)
            : $imageId;
        $originalPath = 'original/' . $originalImageName;

        if (!Storage::disk('public')->exists($originalPath)) {
            return redirect()->back()->withErrors(['error' => 'Original image not found.']);
        }

        $croppedPath = $data['croppedImage']->store('crops', 'public');

        $image = $imgService->save([
            'original_image' => $originalPath,
            'cropped_image' => $croppedPath,
        ]);

        $request->session()->flash('message', 'Image cropped successfully!');

        return redirect()->route('photos.success', ['id' => $image->id]);
    }

    public function successView(Request $request, $id, ImageService $imgService)
    {
        $image = $imgService->get($id);
        return Inertia::render('success', [
            'currentStep' => 3,
            'image' => $image
        ]);
    }
}
