<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('/photos', [ImageController::class, 'uploadPhotoView'])->name('photos.create');
Route::get('/photos/crop/{originalImage}', [ImageController::class, 'cropView'])->name('photos.crop');
Route::get('/photos/success/{id}', [ImageController::class, 'successView'])->name('photos.success');

Route::post('/photos', [ImageController::class, 'store'])->name('photos.store');
Route::post('/photos/finish/{originalImage}', [ImageController::class, 'finish'])->name('photos.finish');
