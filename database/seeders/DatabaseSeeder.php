<?php

namespace Database\Seeders;

use App\Models\Hotel;
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
        $this->call(HotelSeeder::class);

    }
}
