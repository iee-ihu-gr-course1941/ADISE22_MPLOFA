<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        $this->call(CardSeeder::class);
//        User::factory(10)->create();
        User::factory(1)->create([
            'name'=>'Giorgos Tsourdiou',
            'email'=>'geontsou52@gmail.com',
            'password' => Hash::make('Test@laravel2022'),
                'canAdministrate' => true,
                ]
        );
        User::factory(1)->create([
            'name'=>'Xristos Tsourdiou',
            'email'=>'geontsou52@ymail.com',
            'password' => Hash::make('Test@laravel2022'),
                ]
        );
    }
}
