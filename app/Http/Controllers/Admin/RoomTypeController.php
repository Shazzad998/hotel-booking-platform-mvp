<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomTypeRequest;
use App\Http\Requests\UpdateRoomTypeRequest;
use App\Http\Resources\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RoomType::query();
        $query->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');

        $ids = $query->pluck('id');
        $roomTypes = $query->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('admin/room-types/Index', [
            'data' => RoomTypeResource::collection($roomTypes),
            'ids' => $ids,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/room-types/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomTypeRequest $request)
    {
        $validatedData = $request->validated();
        try {
            RoomType::create($validatedData);
            return redirect()->back()->with('success', 'Room-Type created successfully!');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $roomType = new RoomTypeResource(RoomType::findOrFail($id));
        return Inertia::render('admin/room-types/Show', compact('roomType'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $roomType = new RoomTypeResource(RoomType::findOrFail($id));
        return Inertia::render('admin/room-types/Edit', compact('roomType'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomTypeRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $roomType = RoomType::findOrFail($id);
        try {
            $roomType->update($validatedData);
            return redirect()->back()->with('success', "Room-Type updated successfully!");
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to update room-type: ' . $th->getMessage());
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
            return redirect()->back()->with('error', 'No room-type selected.');
        }

        try {
            RoomType::whereIn('id', $ids)->delete();
            $message = count($ids) > 1 ? "Room-Types deleted successfully" : "Room-Type deleted successfully";
            return redirect()->back()->with('success', $message);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete room-type: ' . $th->getMessage());
        }
    }
}
