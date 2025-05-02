<?php

namespace App\Http\Services;

use App\Models\Image;
use Intervention\Image\Laravel\Facades\Image as InterventionImage;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function getAll()
    {
        return Image::orderByRaw('RAND()')->get();
    }

    public function get($id)
    {
        return Image::findOrFail($id);
    }

    public function save(array $data)
    {
        return Image::create([
            'original_image' => Storage::url($data['original_image']),
            'cropped_image' => Storage::url($data['cropped_image'])
        ]);
    }

    public function applyFilter($image, $filter)
    {
        $img = InterventionImage::read($image);

        switch ($filter) {
            case 'grayscale':
                $img->greyscale();
                break;
            case 'brightness':
                $img->brightness(20);
                break;
            case 'contrast':
                $img->contrast(20);
                break;
            default:
                // No filter
                break;
        }

        return $img;
    }
}
