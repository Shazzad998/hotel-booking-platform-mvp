<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'slug',
        'address',
        'city',
        'country',
        'description',
        'images',
        'status',
        'star_rating',
    ];

    protected $casts = [
        'facilities' => 'array',
        'images' => 'array',
    ];


    public function rooms()
    {
        return $this->hasMany(Room::class, 'hotel_id', 'id');
    }


    public function getPriceStartFromAttribute()
    {
        return $this->rooms()->min('price_per_night');
    }
    public function getFacilitiesAttribute()
    {
        return $this->rooms()->min('price_per_night');
    }
}
