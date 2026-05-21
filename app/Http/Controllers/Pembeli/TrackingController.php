<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrackingController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $query = trim((string) $request->query('nomor', ''));

        $recentOrders = Order::query()
            ->where('user_id', $user->id)
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn (Order $order) => [
                'order_number' => $order->order_number,
                'tracking_status_label' => Order::TRACKING_LABELS[$order->tracking_status] ?? $order->tracking_status,
                'ordered_at' => $order->formatDateTime($order->created_at),
            ])
            ->values()
            ->all();

        $order = null;
        $notFound = false;

        if ($query !== '') {
            $found = Order::query()
                ->where('user_id', $user->id)
                ->where('order_number', $query)
                ->first();

            if ($found) {
                $order = $found->toTrackingArray();
            } else {
                $notFound = true;
            }
        }

        return Inertia::render('pembeli/HalamanTracking', [
            'search' => $query,
            'order' => $order,
            'not_found' => $notFound,
            'recent_orders' => $recentOrders,
            'placeholder' => 'Contoh: TYA123456789',
        ]);
    }
}
