<?php

namespace App\Http\Resources\Web;

use App\Http\Resources\RoomTypeResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        $images = $this->images && count($this->images) > 0
            ? collect($this->images)->map(fn($img) => 'storage/' . $img)->toArray()
            : [
                asset('images/fake-room-1.jpg'),
                asset('images/fake-room-2.jpg'),
                asset('images/fake-room-3.jpg'),
                asset('images/fake-room-4.jpg'),
            ];
        return [
            'id'              => $this->id,
            'hotel_id'        => $this->hotel_id,
            'room_type_id'    => $this->room_type_id,
            'room_number'     => $this->room_number,
            'price_per_night' => $this->price_per_night,
            'images'          => $images,
            'status'          => $this->status,
            'room_type'       => new RoomTypeResource($this->whenLoaded('room_type')),
        ];
    }
}
