<?php

namespace App\Http\Controllers\Penjual;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'price_formatted' => $product->formattedPrice(),
                'shipping_from' => $product->shipping_from,
                'is_active' => $product->is_active,
            ])
            ->values()
            ->all();

        return Inertia::render('penjual/Produk', [
            'products' => $products,
        ]);
    }
}
