<?php

use App\Http\Controllers\Admin\HotelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('hotels', HotelController::class);
        Route::post('hotels/bulk-delete', [HotelController::class, 'bulkDelete'])->name('hotels.bulk-delete');
    });


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
