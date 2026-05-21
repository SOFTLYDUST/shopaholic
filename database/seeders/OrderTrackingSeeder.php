<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderTrackingEvent;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class OrderTrackingSeeder extends Seeder
{
    public function run(): void
    {
        $pembeli = User::query()->where('email', 'pembeli@gmail.com')->first();

        if (! $pembeli) {
            return;
        }

        $product = Product::query()->where('is_active', true)->first();

        if (! $product) {
            return;
        }

        $order = Order::query()
            ->where('user_id', $pembeli->id)
            ->where('order_number', 'TYA123456789')
            ->first();

        if (! $order) {
            $order = Order::create([
                'user_id' => $pembeli->id,
                'order_number' => 'TYA123456789',
                'payment_method' => 'transfer_bank',
                'recipient_name' => $pembeli->name,
                'address' => 'Jl. Contoh No. 12',
                'city' => 'Jakarta',
                'postal_code' => '12345',
                'subtotal' => $product->price * 2,
                'shipping_cost' => 35000,
                'total' => ($product->price * 2) + 35000,
                'status' => 'paid',
                'tracking_status' => 'dalam_pengiriman',
                'service_name' => 'Jasa Titip Luar Negeri',
                'destination_country' => 'Indonesia',
                'source_country' => $product->shipping_from ?? 'Singapura',
                'last_tracking_at' => Carbon::parse('2026-05-06 14:20'),
                'created_at' => Carbon::parse('2026-05-06 10:30'),
                'updated_at' => Carbon::parse('2026-05-06 14:20'),
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'price' => $product->price,
                'quantity' => 2,
                'line_total' => $product->price * 2,
            ]);
        } else {
            $order->update([
                'tracking_status' => 'dalam_pengiriman',
                'service_name' => 'Jasa Titip Luar Negeri',
                'destination_country' => 'Indonesia',
                'source_country' => $product->shipping_from ?? 'Singapura',
                'last_tracking_at' => Carbon::parse('2026-05-06 14:20'),
            ]);
            $order->trackingEvents()->delete();
        }

        $events = [
            [
                'status' => 'dalam_pengiriman',
                'title' => 'Paket dalam perjalanan ke Indonesia',
                'location' => 'Singapore',
                'description' => 'Dalam pengiriman internasional menuju Indonesia',
                'occurred_at' => '2026-05-06 14:20',
            ],
            [
                'status' => 'tiba_gudang',
                'title' => 'Paket tiba di gudang luar negeri',
                'location' => 'Singapore Warehouse',
                'description' => 'Barang telah sampai dan dikemas untuk pengiriman',
                'occurred_at' => '2026-05-06 12:00',
            ],
            [
                'status' => 'barang_dibeli',
                'title' => 'Barang berhasil dibeli',
                'location' => $product->shipping_from ?? 'Singapura',
                'description' => 'Tim jastip telah menyelesaikan pembelian produk',
                'occurred_at' => '2026-05-06 11:00',
            ],
            [
                'status' => 'pesanan_diterima',
                'title' => 'Pesanan diterima dan dikonfirmasi',
                'location' => 'Shopaholic',
                'description' => 'Pembayaran terverifikasi, pesanan masuk antrian',
                'occurred_at' => '2026-05-06 10:30',
            ],
        ];

        foreach ($events as $event) {
            OrderTrackingEvent::create([
                'order_id' => $order->id,
                'status' => $event['status'],
                'title' => $event['title'],
                'location' => $event['location'],
                'description' => $event['description'],
                'occurred_at' => Carbon::parse($event['occurred_at']),
            ]);
        }
    }
}
