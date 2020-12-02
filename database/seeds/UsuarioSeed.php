<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Zahid Guerrero',
            'email' => 'z@gmail.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('zahid123'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        //
        DB::table('users')->insert([
            'name' => 'Rosa valdes',
            'email' => 'r@gmail.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('rosa1234'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
