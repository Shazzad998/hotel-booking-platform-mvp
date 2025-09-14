<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('admin', only: ['adminIndex', 'adminShow', 'updateStatus'])
        ];
    }
    public function index()
    {
        $bookings = Booking::where('user_id', Auth::id())->latest()->paginate(10);

        return inertia('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function show(string $id)
    {
        $booking = Booking::where('user_id', Auth::id())->where('id', $id)->first();
        if (!$booking) abort(404);
        
        return inertia('Bookings/Show', [
            'booking' => $booking->load('hotel', 'room'),
        ]);
    }

    public function cancel(string $id)
    {

        $booking = Booking::where('user_id', Auth::id())->where('id', $id)->first();

        if (!$booking) abort(404);


        // check 36h rule here (reusing availability service logic if needed)
        if (now()->greaterThanOrEqualTo($booking->start_date)) {
            return back()->with('error', 'Booking has already started and cannot be cancelled.');
        }

        if (now()->diffInHours($booking->start_date) < 36) {
            return back()->with('error', 'Booking can only be cancelled 36 hours before start.');
        }

        $booking->update(['status' => 'cancelled']);

        return back()->with('success', 'Booking cancelled successfully.');
    }

    // --- Admin methods ---

    public function adminIndex()
    {
        $bookings = Booking::with(['hotel', 'room', 'user'])->latest()->paginate(20);

        return inertia('Admin/Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function adminShow(Booking $booking)
    {
        return inertia('Admin/Bookings/Show', [
            'booking' => $booking->load('hotel', 'room', 'user'),
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,checked_in,checked_out',
        ]);

        $booking->update(['status' => $request->status]);

        return back()->with('success', 'Booking status updated.');
    }
}
