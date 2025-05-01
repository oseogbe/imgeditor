<?php

namespace App\Http\Services;

use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ImageService
{
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
}
