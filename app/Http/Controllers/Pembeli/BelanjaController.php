<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class BelanjaController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'price_formatted' => $product->formattedPrice(),
                'image' => $product->image,
                'shipping_from' => $product->shipping_from,
            ]);

        $categories = collect([]);

        return Inertia::render('pembeli/HalamanBelanja', [
            'products' => $products->values()->all(),
            'categories' => $categories->values()->all(),
        ]);
    }
}