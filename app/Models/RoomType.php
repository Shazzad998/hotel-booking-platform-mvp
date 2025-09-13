<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'hotel_id',
        'name',
        'description',
        'no_of_bedrooms',
        'max_guests',
        'facilities',
    ];

    protected $casts = [
        'facilities' => 'array',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
