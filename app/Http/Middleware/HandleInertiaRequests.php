<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'app' => [
                'name' => config('app.name', 'Shopaholic'),
            ],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                ] : null,
            ],
            'cart' => $this->cartSummary($request),
        ]);
    }

    /** @return array{count: int, subtotal_formatted: string}|null */
    private function cartSummary(Request $request): ?array
    {
        $user = $request->user();

        if (! $user || $user->role !== 'pembeli') {
            return null;
        }

        $rows = $user->cartItems()->with('product')->get();
        $subtotal = $rows->sum(fn ($item) => $item->product->price * $item->quantity);

        return [
            'count' => (int) $rows->sum('quantity'),
            'subtotal_formatted' => Product::formatRupiah($subtotal),
        ];
    }
}
