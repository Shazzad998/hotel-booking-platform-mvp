<?php

use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    //Admin Routes
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        //Hotel Routes
        Route::resource('hotels', HotelController::class);
        Route::post('hotels/bulk-delete', [HotelController::class, 'bulkDelete'])->name('hotels.bulk-delete');

        //Room-Type Routes
        Route::resource('room-types', RoomTypeController::class);
        Route::post('room-types/bulk-delete', [RoomTypeController::class, 'bulkDelete'])->name('room-types.bulk-delete');

        //Room Routes
        Route::resource('rooms', RoomController::class);
        Route::post('rooms/bulk-delete', [RoomController::class, 'bulkDelete'])->name('rooms.bulk-delete');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
