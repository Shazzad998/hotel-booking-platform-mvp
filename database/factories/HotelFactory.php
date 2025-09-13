<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company . ' Hotel';
        
        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 1000),
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'country' => $this->faker->country,
            'description' => $this->faker->paragraph(3),
            'images' => json_encode([]),
            'star_rating' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
