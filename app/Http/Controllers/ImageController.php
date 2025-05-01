<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadCroppedImageRequest;
use App\Http\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function uploadPhotoView(Request $request)
    {
        return Inertia::render('photo');
    }

    public function store(Request $request)
    {
        $path = $request->file('image')->store('original', 'public');
        $originalImageId = basename($path);
        return redirect()->route('photos.crop', ['originalImage' => $originalImageId]);
    }

    public function cropView(Request $request, $originalImage)
    {
        return Inertia::render('crop', [
            'currentStep' => 2,
            'originalImageId' => $originalImage,
        ]);
    }

    public function finish(UploadCroppedImageRequest $request, $originalImage, ImageService $imgService)
    {
        $data = $request->validated();

        $originalPath = 'original/' . $originalImage;
        $croppedPath = $data['croppedImage']->store('crops', 'public');

        $image = $imgService->save([
            'original_image' => $originalPath,
            'cropped_image' => $croppedPath
        ]);

        $request->session()->flash('message', 'Image cropped successfully!');

        return redirect()->route('photos.success', ['id' => $image['id']]);
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
