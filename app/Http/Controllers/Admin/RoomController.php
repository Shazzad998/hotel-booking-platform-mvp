<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Room::query()->with(['hotel', 'room_type']);
        $query->when($request->search, function ($query, $search) {
            $query->where('room_number', 'like', "%{$search}%")
                ->orWhere('status', 'like', "%{$search}%")
                ->orWhereHas('room_type', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('hotel', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
        })->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');

        $ids = $query->pluck('id');
        $rooms = $query->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('admin/rooms/Index', [
            'data' => RoomResource::collection($rooms),
            'ids' => $ids,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hotels = Hotel::query()->get(['id', 'name']);
        $room_types = RoomType::query()->get(['id', 'name']);
        return Inertia::render('admin/rooms/Create', compact('hotels', 'room_types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        $validatedData = $request->validated();
        try {
            // Handle image uploads
            if ($request->hasFile('images')) {
                $paths = [];
                foreach ($request->file('images') as $image) {
                    $paths[] = $image->store('rooms', 'public');
                }
                $validatedData['images'] = $paths;
            }

            Room::create($validatedData);
            return redirect()->back()->with('success', 'Room created successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $room = new RoomResource(Room::findOrFail($id));
        return Inertia::render('admin/rooms/Show', compact('room'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $room = new RoomResource(Room::query()->with('hotel', 'room_type')->where('id',$id)->first());
        $hotels = Hotel::query()->get(['id', 'name']);
        $room_types = RoomType::query()->get(['id', 'name']);
        return Inertia::render('admin/rooms/Edit', compact('room', 'hotels', 'room_types'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $room = Room::findOrFail($id);
        try {
            // Get existing images
            $paths = $room->images ?? [];

            // Remove selected images
            if (!empty($validatedData['remove_images'])) {
                foreach ($validatedData['remove_images'] as $remove) {
                    if (in_array($remove, $paths)) {
                        // delete from storage
                        Storage::disk('public')->delete($remove);
                        // remove from array
                        $paths = array_diff($paths, [$remove]);
                    }
                }
            }

            // Add new images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $paths[] = $image->store('rooms', 'public');
                }
            }
            $validatedData['images'] = array_values($paths);
            $room->update($validatedData);

            return redirect()->back()->with('success', "Room updated successfully!");
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete room: ' . $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function bulkDelete(Request $request)
    {
        $ids = (array) $request->ids;

        if (empty($ids)) {
            return redirect()->back()->with('error', 'No room selected.');
        }

        try {
            $rooms = Room::whereIn('id', $ids)->get(['id', 'images']);

            $allImages = $rooms->flatMap(function ($room) {
                return $room->images ?? [];
            })->filter();

            if ($allImages->isNotEmpty()) {
                Storage::disk('public')->delete($allImages->all());
            }

            Room::whereIn('id', $ids)->delete();

            $message = count($ids) > 1 ? "Rooms deleted successfully" : "Room deleted successfully";
            return redirect()->back()->with('success', $message);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete room: ' . $th->getMessage());
        }
    }
}
