<?php

namespace App\Http\Controllers;

use App\Http\Resources\Web\HotelResource;
use App\Http\Resources\Web\RoomResource;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Show all hotels
    public function home()
    {
        $hotels = HotelResource::collection(Hotel::with('rooms')->get());
        return Inertia::render('web/Home', compact('hotels'));
    }


    public function search(Request $request)
    {
        $search   = $request->input('search');
        $from       = $request->input('from');
        $to         = $request->input('to');
        $rooms      = (int) $request->input('number_of_rooms', 1);
        $guests     = (int) $request->input('number_of_guests', 1);

        $hotels = Hotel::query()
            ->with(['rooms.room_type'])
            // 🔍 search filter
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%");
                });
            })
            // 🔍 Available rooms filter
            ->whereHas('rooms', function ($q) use ($from, $to) {
                $q->available($from, $to);
            })
            // 🔍 Room type requirements filter
            ->whereHas('rooms.room_type', function ($q) use ($rooms, $guests) {
                $q->where('no_of_bedrooms', '>=', $rooms)
                    ->where('max_guests', '>=', $guests);
            })
            ->get();

        return Inertia::render('web/Search', [
            'hotels' => HotelResource::collection($hotels),
            'filters' => $request->only(['search', 'from', 'to', 'number_of_rooms', 'number_of_guests']),
        ]);
    }



    // Show single hotel with rooms
    public function show(string $slug, Request $request)
    {
        $hotel = Hotel::with('rooms.room_type')->where('slug', $slug)->first();



        $rooms = Room::with('room_type')->where('hotel_id', $hotel->id)->get();

        return inertia('web/ShowHotel', [
            'hotel' => new HotelResource($hotel),
            'rooms' => RoomResource::collection($rooms),
        ]);
    }

    public function bookingCreate()
    {
        return Inertia::render('web/BookingCreate');
    }
}
