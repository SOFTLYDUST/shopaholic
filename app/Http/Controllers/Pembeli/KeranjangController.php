<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Pembeli\Concerns\ResolvesCart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KeranjangController extends Controller
{
    use ResolvesCart;

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
}
