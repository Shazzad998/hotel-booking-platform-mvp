<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;

class RoomAvailabilityService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    /**
     * Check if a single room is available
     */
    public function isAvailable($roomId, $startDate, $endDate): bool
    {

        $startDate = Carbon::parse($startDate)->toDateString(); // "2025-09-14"
        $endDate   = Carbon::parse($endDate)->toDateString();   // "2025-09-16"
        return !Booking::where('room_id', $roomId)
            ->whereIn('status', ['pending','confirmed','checked_in'])
            ->where(function ($q) use ($startDate, $endDate) {
                $q->whereBetween('start_date', [$startDate, $endDate])
                  ->orWhereBetween('end_date', [$startDate, $endDate])
                  ->orWhere(function ($sub) use ($startDate, $endDate) {
                      $sub->where('start_date', '<=', $startDate)
                          ->where('end_date', '>=', $endDate);
                  });
            })
            ->exists();
    }

    /**
     * Get all available rooms in a hotel for a date range
     */
    public function getAvailableRooms($hotelId, $startDate, $endDate)
    {
        $rooms = Room::with('room_type')->where('hotel_id', $hotelId)->get();

        return $rooms->filter(function ($room) use ($startDate, $endDate) {
            return $this->isAvailable($room->id, $startDate, $endDate);
        })->values(); // reset collection keys
    }
}
