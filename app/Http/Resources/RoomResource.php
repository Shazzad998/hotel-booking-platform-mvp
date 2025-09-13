<?php

namespace App\Http\Resources;

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
       return [
            'id'              => $this->id,
            'hotel_id'        => $this->hotel_id,
            'room_type_id'    => $this->room_type_id,
            'room_number'     => $this->room_number,
            'price_per_night' => $this->price_per_night,
            'images'          => $this->images,
            'status'          => $this->status,
            'created_at'      => $this->created_at?->toDateTimeString(),
            'updated_at'      => $this->updated_at?->toDateTimeString(),

            // Relations (only if they are loaded)
            'hotel'           => new HotelResource($this->whenLoaded('hotel')),
            'room_type'       => new RoomTypeResource($this->whenLoaded('room_type')),
        ];
    }
}
