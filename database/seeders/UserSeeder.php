<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->where('email', 'admin@gmail.com')->delete();

        $users = [
            [
                'name' => 'Penjual Shopaholic',
                'email' => 'penjual@gmail.com',
                'password' => 'password',
                'role' => 'penjual',
            ],
            [
                'name' => 'Pembeli Shopaholic',
                'email' => 'pembeli@gmail.com',
                'password' => 'password',
                'role' => 'pembeli',
            ],
        ];

        foreach ($users as $data) {
            User::updateOrCreate(
                ['email' => $data['email']],
                $data,
            );
        }
    }
}
