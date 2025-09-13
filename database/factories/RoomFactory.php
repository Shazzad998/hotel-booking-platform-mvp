<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'hotel_id'        => Hotel::factory(),
            'room_type_id'    => RoomType::factory(),
            'room_number'     => strtoupper($this->faker->bothify('R###')),
            'price_per_night' => $this->faker->randomFloat(2, 50, 1000),
            'images'          => [],
            'status'          => $this->faker->randomElement(['available', 'booked', 'under_maintenance']),
        ];
    }
}
