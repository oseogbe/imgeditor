<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ImageController::class, 'getImages'])->name('photos.all');
Route::get('/photos', [ImageController::class, 'uploadPhotoView'])->name('photos.create');
Route::get('/photos/edit/{imageId}', [ImageController::class, 'editView'])->name('photos.edit');
Route::get('/photos/success/{id}', [ImageController::class, 'successView'])->name('photos.success');

Route::post('/photos', [ImageController::class, 'store'])->name('photos.store');
Route::post('/photos/apply-filter/{imageId}', [ImageController::class, 'applyFilter'])->name('photos.applyFilter');
Route::post('/photos/finish/{imageId}', [ImageController::class, 'finish'])->name('photos.finish');
