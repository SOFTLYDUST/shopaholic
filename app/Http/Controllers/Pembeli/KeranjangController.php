<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KeranjangController extends Controller
{
    public function index(Request $request): Response
    {
        $items = $this->cartItemsFor($request);

        return Inertia::render('pembeli/KeranjangBelanja', [
            'items' => $items['items'],
            'subtotal' => $items['subtotal'],
            'subtotal_formatted' => Product::formatRupiah($items['subtotal']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $item = CartItem::query()->firstOrNew([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'],
        ]);

        $item->quantity = ($item->exists ? $item->quantity : 0) + 1;
        $item->save();

        return back();
    }

    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $this->authorizeCartItem($request, $cartItem);

        $cartItem->increment('quantity');

        return back();
    }

    public function destroy(Request $request, CartItem $cartItem): RedirectResponse
    {
        $this->authorizeCartItem($request, $cartItem);

        $cartItem->delete();

        return back();
    }

    private function authorizeCartItem(Request $request, CartItem $cartItem): void
    {
        abort_unless($cartItem->user_id === $request->user()->id, 403);
    }

    /** @return array{items: array<int, array<string, mixed>>, subtotal: int} */
    private function cartItemsFor(Request $request): array
    {
        $rows = CartItem::query()
            ->with('product')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        $subtotal = 0;
        $items = $rows->map(function (CartItem $item) use (&$subtotal) {
            $lineTotal = $item->product->price * $item->quantity;
            $subtotal += $lineTotal;

            return [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'product' => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'image' => $item->product->image,
                    'price' => $item->product->price,
                    'price_formatted' => $item->product->formattedPrice(),
                    'line_total' => $lineTotal,
                    'line_total_formatted' => Product::formatRupiah($lineTotal),
                ],
            ];
        })->values()->all();

        return ['items' => $items, 'subtotal' => $subtotal];
    }
}
