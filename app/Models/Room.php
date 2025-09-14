<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'room_type_id',
        'room_number',
        'price_per_night',
        'images',
        'status',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function room_type()
    {
        return $this->belongsTo(RoomType::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }


    public function scopeAvailable($query, $startDate, $endDate)
    {
        $startDate = Carbon::parse($startDate)->toDateString(); // "2025-09-14"
        $endDate   = Carbon::parse($endDate)->toDateString();   // "2025-09-16"
        return $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
            $q->whereIn('status', ['pending', 'confirmed', 'checked_in'])
                ->where(function ($q2) use ($startDate, $endDate) {
                    $q2->whereBetween('start_date', [$startDate, $endDate])
                        ->orWhereBetween('end_date', [$startDate, $endDate])
                        ->orWhere(function ($sub) use ($startDate, $endDate) {
                            $sub->where('start_date', '<=', $startDate)
                                ->where('end_date', '>=', $endDate);
                        });
                });
        });
    }
}
