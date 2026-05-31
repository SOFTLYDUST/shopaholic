<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BelanjaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $category = $request->category;

        $products = Product::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('category', 'like', "%{$search}%");
            })
            ->when($category, function ($query) use ($category) {
                $query->where('category', $category);
            })
            ->orderBy('name')
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'price_formatted' => number_format($product->price, 0, ',', '.'),
                'image' => $product->image,
                'category' => $product->category,
                'shipping_from' => $product->shipping_from,
            ]);

        $categories = Product::select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('pembeli/HalamanBelanja', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}