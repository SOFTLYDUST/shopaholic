<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\JastipTrip;
use Inertia\Inertia;
use Inertia\Response;

class RuteController extends Controller
{
    public function index(): Response
    {
        $all = JastipTrip::query()
            ->orderBy('sort_order')
            ->orderBy('departure_date')
            ->get();

        $current = $all->filter(fn (JastipTrip $trip) => $trip->isCurrent())->values();
        $upcoming = $all->filter(fn (JastipTrip $trip) => $trip->status === JastipTrip::STATUS_PERSIAPAN)->values();

        $defaultTrip = $current->first() ?? $upcoming->first() ?? $all->first();

        return Inertia::render('pembeli/HalamanRute', [
            'current_trips' => $current->map->toFrontendArray()->values()->all(),
            'upcoming_trips' => $upcoming->map->toFrontendArray()->values()->all(),
            'selected_trip' => $defaultTrip?->toFrontendArray(),
            'status_legend' => collect([
                JastipTrip::STATUS_PERSIAPAN,
                JastipTrip::STATUS_OPEN_PO,
                JastipTrip::STATUS_CHECKOUT,
                JastipTrip::STATUS_SEDANG_DI_PERJALANAN,
                JastipTrip::STATUS_SUDAH_KEMBALI,
            ])->map(fn (string $status) => [
                'key' => $status,
                'label' => JastipTrip::statusLabel($status),
            ])->values()->all(),
        ]);
    }
}
