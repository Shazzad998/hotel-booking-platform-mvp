<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Generate Admin user
        $this->call(AdminUserSeeder::class);
        //Generate Fake Hotels
        // $this->call(HotelSeeder::class);

        //Generate Fake Room Types
        // RoomType::factory()->count(10)->create();
        //Generate Fake Rooms
        Room::factory()->count(10)->create();



    }
}
