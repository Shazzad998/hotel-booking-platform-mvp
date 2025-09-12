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
}
