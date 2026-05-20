<?php

namespace Database\Seeders;

use App\Models\JastipTrip;
use Illuminate\Database\Seeder;

class JastipTripSeeder extends Seeder
{
    public function run(): void
    {
        $trips = [
            [
                'title' => 'Trip Tokyo — Open PO',
                'origin_city' => 'Malang',
                'origin_country' => 'Indonesia',
                'destination_city' => 'Tokyo',
                'destination_country' => 'Jepang',
                'status' => JastipTrip::STATUS_OPEN_PO,
                'departure_date' => now()->addDays(5),
                'transit_city' => 'Singapura',
                'transit_date' => now()->addDays(6),
                'estimated_return_date' => now()->addDays(14),
                'order_deadline' => now()->addDays(3)->setTime(23, 59, 0),
                'titip_estimation' => 'Estimasi titip 7–10 hari kerja setelah PO ditutup',
                'origin_lat' => -7.9666,
                'origin_lng' => 112.6326,
                'destination_lat' => 35.6762,
                'destination_lng' => 139.6503,
                'transit_lat' => 1.3521,
                'transit_lng' => 103.8198,
                'sort_order' => 1,
            ],
            [
                'title' => 'Trip Seoul — Checkout',
                'origin_city' => 'Malang',
                'origin_country' => 'Indonesia',
                'destination_city' => 'Seoul',
                'destination_country' => 'Korea Selatan',
                'status' => JastipTrip::STATUS_CHECKOUT,
                'departure_date' => now()->addDays(2),
                'transit_city' => null,
                'transit_date' => null,
                'estimated_return_date' => now()->addDays(10),
                'order_deadline' => now()->addHours(18),
                'titip_estimation' => 'Batas akhir order hari ini — segera checkout',
                'origin_lat' => -7.9666,
                'origin_lng' => 112.6326,
                'destination_lat' => 37.5665,
                'destination_lng' => 126.9780,
                'transit_lat' => null,
                'transit_lng' => null,
                'sort_order' => 2,
            ],
            [
                'title' => 'Trip Bangkok — Sedang di Perjalanan',
                'origin_city' => 'Malang',
                'origin_country' => 'Indonesia',
                'destination_city' => 'Bangkok',
                'destination_country' => 'Thailand',
                'status' => JastipTrip::STATUS_SEDANG_DI_PERJALANAN,
                'departure_date' => now()->subDays(2),
                'transit_city' => 'Kuala Lumpur',
                'transit_date' => now()->subDay(),
                'estimated_return_date' => now()->addDays(5),
                'order_deadline' => now()->subDays(5),
                'titip_estimation' => 'PO ditutup — barang sedang dibeli di Bangkok',
                'origin_lat' => -7.9666,
                'origin_lng' => 112.6326,
                'destination_lat' => 13.7563,
                'destination_lng' => 100.5018,
                'transit_lat' => 3.1390,
                'transit_lng' => 101.6869,
                'sort_order' => 3,
            ],
            [
                'title' => 'Trip Sydney — Persiapan',
                'origin_city' => 'Malang',
                'origin_country' => 'Indonesia',
                'destination_city' => 'Sydney',
                'destination_country' => 'Australia',
                'status' => JastipTrip::STATUS_PERSIAPAN,
                'departure_date' => now()->addDays(21),
                'transit_city' => 'Bali (ngumpul paket)',
                'transit_date' => now()->addDays(20),
                'estimated_return_date' => now()->addDays(32),
                'order_deadline' => now()->addDays(14)->setTime(23, 59, 0),
                'titip_estimation' => 'Open PO diperkirakan 2 minggu sebelum keberangkatan',
                'origin_lat' => -7.9666,
                'origin_lng' => 112.6326,
                'destination_lat' => -33.8688,
                'destination_lng' => 151.2093,
                'transit_lat' => -8.3405,
                'transit_lng' => 115.0920,
                'sort_order' => 10,
            ],
            [
                'title' => 'Trip Paris — Persiapan',
                'origin_city' => 'Malang',
                'origin_country' => 'Indonesia',
                'destination_city' => 'Paris',
                'destination_country' => 'Prancis',
                'status' => JastipTrip::STATUS_PERSIAPAN,
                'departure_date' => now()->addDays(35),
                'transit_city' => 'Dubai',
                'transit_date' => now()->addDays(36),
                'estimated_return_date' => now()->addDays(48),
                'order_deadline' => now()->addDays(28)->setTime(23, 59, 0),
                'titip_estimation' => 'Trip musim panas Eropa — slot terbatas',
                'origin_lat' => -7.9666,
                'origin_lng' => 112.6326,
                'destination_lat' => 48.8566,
                'destination_lng' => 2.3522,
                'transit_lat' => 25.2048,
                'transit_lng' => 55.2708,
                'sort_order' => 11,
            ],
        ];

        foreach ($trips as $trip) {
            JastipTrip::updateOrCreate(
                ['title' => $trip['title']],
                $trip,
            );
        }
    }
}
