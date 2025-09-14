<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\Room;
use App\Services\RoomAvailabilityService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function bookingCreate(Request $request)
    {
        $hotel = Hotel::with('rooms')->findOrFail($request->hotel_id);
        $room = Room::with('room_type')->findOrFail($request->room_id);

        $checkIn  = Carbon::parse($request->from);
        $checkOut = Carbon::parse($request->to);

        // Count number of days
        $numberOfDays = $checkIn->diffInDays($checkOut);

        return inertia('web/BookingCreate', [
            'hotel' => $hotel,
            'room' => $room,
            'check_in' => $checkIn->format('D d M Y'),
            'check_out' => $checkOut->format('D d M Y'),
            'guests' => $request->number_of_guests,
            'rooms' => $request->number_of_rooms,
            'nights' => $numberOfDays
        ]);
    }

    public function bookingStore(Request $request, RoomAvailabilityService $availabilityService)
    {
        $validated = $request->validate([
            'hotel_id'   => 'required|exists:hotels,id',
            'room_id'    => 'required|exists:rooms,id',
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|max:255',
            'phone'      => 'required|string|max:20',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date'   => 'required|date|after:start_date',
        ]);


        // Check availability using service
        $isAvailable = $availabilityService->isAvailable(
            $validated['room_id'],
            $validated['start_date'],
            $validated['end_date']
        );

        if (! $isAvailable) {
            return redirect()->back()->with('error', 'This room is not available for the selected dates.');
        }

        // Calculate total price (basic example: nights * room price)
        $room = Room::findOrFail($validated['room_id']);
        $nights = \Carbon\Carbon::parse($validated['start_date'])
            ->diffInDays(\Carbon\Carbon::parse($validated['end_date']));
        $total = $nights * $room->price_per_night;

        // dd($validated, $room, $total,  $isAvailable);
        // Create booking
        $booking = Booking::create([
            'user_id'    => Auth::id(), // null if guest
            'hotel_id'   => $validated['hotel_id'],
            'room_id'    => $validated['room_id'],
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'phone'      => $validated['phone'],
            'start_date' => $validated['start_date'],
            'end_date'   => $validated['end_date'],
            'status'     => 'pending',
            'total'      => $total,
            'reference'  => strtoupper(Str::random(10)),
        ]);

        //  Send confirmation email
        // Mail::to($booking->email)->send(new \App\Mail\BookingConfirmationMail($booking));

        return redirect()->route('bookings.show', $booking->reference)
            ->with('success', 'Booking completed successfully! A confirmation email has been sent.');
    }


    public function show($reference)
    {
        $booking = Booking::with('hotel', 'room.room_type')->where('reference', $reference)->firstOrFail();
        $canCancel = false;

        // Only allow cancel if booking is still pending or confirmed
        if (in_array($booking->status, ['pending', 'confirmed'])) {
            $now = Carbon::now();
            $startDate = Carbon::parse($booking->start_date);

            // Check if at least 36 hours remain
            if ($now->diffInHours($startDate, false) >= 36) {
                $canCancel = true;
            }
        }

        return inertia('web/BookingShow', [
            'booking'   => $booking,
            'canCancel' => $canCancel,
        ]);
    }


    public function cancel(Booking $booking)
    {
        $now = Carbon::now();
        $startDate = Carbon::parse($booking->start_date);

        // Prevent cancel if already cancelled or started
        if ($booking->status === 'cancelled') {
            return back()->with('error', 'Booking already cancelled.');
        }

        if ($now->greaterThanOrEqualTo($startDate)) {
            return back()->with('error', 'Booking has already started and cannot be cancelled.');
        }

        if ($now->diffInHours($startDate, false) < 36) {
            return back()->with('error', 'Bookings can only be cancelled at least 36 hours before start date.');
        }

        $booking->update(['status' => 'cancelled']);

        return redirect()->route('bookings.show', $booking->id)
            ->with('success', 'Booking cancelled successfully.');
    }
}
