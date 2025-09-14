<?php

use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/search', [HomeController::class, 'search'])->name('search');
Route::get('/hotels/{hotel}', [HomeController::class, 'show'])->name('hotels.show');
Route::get('/booking/create', [BookingController::class, 'bookingCreate'])->name('booking.create');
Route::post('/booking', [BookingController::class, 'bookingStore'])->name('booking.store');
Route::get('/bookings/{reference}', [BookingController::class, 'show'])->name('bookings.show');
Route::post('/bookings/cancel/{id}', [BookingController::class, 'cancel'])->name('bookings.cancel');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/bookings', [AdminBookingController::class, 'index'])->name('user.bookings.index');
    Route::get('/bookings/{id}', [AdminBookingController::class, 'show'])->name('user.bookings.show');
    Route::post('/bookings/{id}/cancel', [AdminBookingController::class, 'cancel'])->name('user.bookings.cancel');


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

        Route::get('/bookings', [AdminBookingController::class, 'adminIndex'])->name('bookings.index');
        Route::get('/bookings/{id}', [AdminBookingController::class, 'adminShow'])->name('bookings.show');
        Route::post('/bookings/{id}/update-status', [AdminBookingController::class, 'updateStatus'])->name('bookings.updateStatus');

    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
