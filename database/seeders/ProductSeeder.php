<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Kaos Rebook', 'price' => 299000, 'category' => 'Fashion', 'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
            ['name' => 'Dompet Stradivarius', 'price' => 350000, 'category' => 'Aksesoris', 'image' => 'https://images.unsplash.com/photo-1627123424574-10eb9470a9be?w=400&h=400&fit=crop'],
            ['name' => 'Croptop Bershka', 'price' => 400000, 'category' => 'Fashion', 'image' => 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop'],
            ['name' => 'Keychain Labubu', 'price' => 435000, 'category' => 'Aksesoris', 'image' => 'https://images.unsplash.com/photo-1606760227091-3dd870d1f947?w=400&h=400&fit=crop'],
            ['name' => 'Belt Calvinkein', 'price' => 575000, 'category' => 'Aksesoris', 'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
            ['name' => 'Tas Gentle Woman', 'price' => 620000, 'category' => 'Tas', 'image' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
            ['name' => 'Sepatu Nike', 'price' => 715000, 'category' => 'Sepatu', 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'],
            ['name' => 'Kemeja Zara', 'price' => 480000, 'category' => 'Fashion', 'image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'],
            ['name' => 'Jam Tangan Casio', 'price' => 890000, 'category' => 'Aksesoris', 'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
            ['name' => 'Dress H&M', 'price' => 520000, 'category' => 'Fashion', 'image' => 'https://images.unsplash.com/photo-1595777457583-95e059d58169?w=400&h=400&fit=crop'],
            ['name' => 'Topi New Era', 'price' => 310000, 'category' => 'Aksesoris', 'image' => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop'],
            ['name' => 'Sandal Adidas', 'price' => 650000, 'category' => 'Sepatu', 'image' => 'https://images.unsplash.com/photo-1606107557195-0fa274dea4c3?w=400&h=400&fit=crop'],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => Str::slug($product['name'])],
                [
                    ...$product,
                    'slug' => Str::slug($product['name']),
                    'shipping_from' => collect(['Jakarta', 'Bandung', 'Surabaya', 'Bali'])->random(),
                ],
            );
        }
    }
}
