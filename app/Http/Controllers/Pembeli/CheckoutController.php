<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Pembeli\Concerns\ResolvesCart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    use ResolvesCart;

    public function index(Request $request): Response|RedirectResponse
    {
        $cart = $this->cartItemsFor($request);

        if (count($cart['items']) === 0) {
            return redirect()->route('pembeli.keranjang');
        }

        $user = $request->user();
        $shipping = self::SHIPPING_COST;
        $total = $cart['subtotal'] + $shipping;

        return Inertia::render('pembeli/HalamanPembayaran', [
            'items' => $cart['items'],
            'subtotal' => $cart['subtotal'],
            'subtotal_formatted' => Product::formatRupiah($cart['subtotal']),
            'shipping_cost' => $shipping,
            'shipping_cost_formatted' => Product::formatRupiah($shipping),
            'total' => $total,
            'total_formatted' => Product::formatRupiah($total),
            'shipping' => [
                'name' => $user->name,
                'address' => $user->address ?? '',
                'city' => $user->city ?? '',
                'postal_code' => $user->postal_code ?? '',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $cart = $this->cartItemsFor($request);

        if (count($cart['items']) === 0) {
            return redirect()->route('pembeli.keranjang');
        }

        $validated = $request->validate([
            'payment_method' => ['required', 'in:transfer_bank,e_wallet'],
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:10'],
        ]);

        $shipping = self::SHIPPING_COST;
        $total = $cart['subtotal'] + $shipping;

        $order = DB::transaction(function () use ($request, $validated, $cart, $shipping, $total) {
            $user = $request->user();

            $user->update([
                'name' => $validated['name'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
            ]);

            $order = Order::create([
                'user_id' => $user->id,
                'payment_method' => $validated['payment_method'],
                'recipient_name' => $validated['name'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
                'subtotal' => $cart['subtotal'],
                'shipping_cost' => $shipping,
                'total' => $total,
                'status' => 'paid',
            ]);

            foreach ($cart['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']['id'],
                    'product_name' => $item['product']['name'],
                    'price' => $item['product']['price'],
                    'quantity' => $item['quantity'],
                    'line_total' => $item['product']['line_total'],
                ]);
            }

            $user->cartItems()->delete();

            return $order;
        });

        return redirect()->route('pembeli.checkout.sukses', $order);
    }

    public function success(Order $order): Response
    {
        abort_unless($order->user_id === auth()->id(), 403);

        $order->load('items');

        return Inertia::render('pembeli/HalamanPembayaranSukses', [
            'order' => [
                'id' => $order->id,
                'total_formatted' => Product::formatRupiah($order->total),
                'payment_method' => $order->payment_method === 'transfer_bank' ? 'Transfer Bank' : 'E-wallet',
                'items' => $order->items->map(fn (OrderItem $item) => [
                    'name' => $item->product_name,
                    'quantity' => $item->quantity,
                ])->values()->all(),
            ],
        ]);
    }
}
