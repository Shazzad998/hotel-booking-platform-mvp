<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'name'         => $this->faker->words(2, true),
            'description'  => $this->faker->sentence(12),
            'no_of_bedrooms' => $this->faker->numberBetween(1, 5),
            'max_guests'   => $this->faker->numberBetween(1, 10),
            'facilities'   => $this->faker->randomElements([
                'Free WiFi',
                'Air Conditioning',
                'Flat Screen TV',
                'Mini Bar',
                'Room Service',
                'Balcony',
                'Ocean View',
                'Hot Tub',
                'Kitchenette',
                'Coffee Maker',
            ], $this->faker->numberBetween(2, 5)),
        ];
    }
}
