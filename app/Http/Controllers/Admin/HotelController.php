<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Http\Resources\HotelResource;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return ['admin'];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Hotel::query();
        $query->when($request->search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%");
        })->orderBy($request->sort_by ?? 'id', $request->sort_direction ?? 'desc');

        $ids = $query->pluck('id');
        $hotels = $query->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('admin/hotels/Index', [
            'data' => HotelResource::collection($hotels),
            'ids' => $ids,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction', 'per_page'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/hotels/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request)
    {

        $validatedData = $request->validated();

        try {
            // Handle image uploads
            if ($request->hasFile('images')) {
                $paths = [];
                foreach ($request->file('images') as $image) {
                    $paths[] = $image->store('hotels', 'public');
                }
                $validatedData['images'] = $paths;
            }

            Hotel::create($validatedData);
            return redirect()->back()->with('success', 'Hotel created successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hotel = new HotelResource(Hotel::findOrFail($id));
        return Inertia::render('admin/hotels/Show', compact('hotel'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $hotel = new HotelResource(Hotel::findOrFail($id));
        return Inertia::render('admin/hotels/Edit', compact('hotel'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, string $id)
    {
        $validatedData = $request->validated();
        $hotel = Hotel::findOrFail($id);
        try {
            // Get existing images
            $paths = $hotel->images ?? [];

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
                    $paths[] = $image->store('hotels', 'public');
                }
            }
            $validatedData['images'] = array_values($paths);
            $hotel->update($validatedData);

            return redirect()->back()->with('success', "Hotel updated successfully!");
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete hotels: ' . $th->getMessage());
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
            return redirect()->back()->with('error', 'No hotels selected.');
        }

        try {
            $hotels = Hotel::whereIn('id', $ids)->get(['id', 'images']);

            $allImages = $hotels->flatMap(function ($hotel) {
                return $hotel->images ?? [];
            })->filter();

            if ($allImages->isNotEmpty()) {
                Storage::disk('public')->delete($allImages->all());
            }

            Hotel::whereIn('id', $ids)->delete();

            $message = count($ids) > 1 ? "Hotels deleted successfully" : "Hotel deleted successfully";
            return redirect()->back()->with('success', $message);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete hotels: ' . $th->getMessage());
        }
    }
}
