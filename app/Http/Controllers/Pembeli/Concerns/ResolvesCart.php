<?php

namespace App\Http\Controllers\Pembeli\Concerns;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

trait ResolvesCart
{
    public const SHIPPING_COST = 35000;

    /** @return array{items: array<int, array<string, mixed>>, subtotal: int} */
    protected function cartItemsFor(Request $request): array
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
