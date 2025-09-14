<?php

namespace App\Http\Resources\Web;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
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
                asset('images/fake-hotel-1.jpg'),
                asset('images/fake-hotel-2.jpg'),
                asset('images/fake-hotel-3.jpg'),
                asset('images/fake-hotel-4.jpg'),
                asset('images/fake-hotel-5.jpg'),
                asset('images/fake-hotel-6.jpg'),
            ];
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'description' => $this->description,
            'images' => $images,
            'star_rating' => $this->star_rating,
            'price_start_from' => $this->price_start_from
        ];
    }
}
