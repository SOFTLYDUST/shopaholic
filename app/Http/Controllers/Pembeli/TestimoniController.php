<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\Testimoni;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimoniController extends Controller
{
    public function index(): Response
    {
        $testimonials = Testimoni::latest()->get();

        return Inertia::render('pembeli/Testimoni', [
            'testimonials' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'komentar' => 'required|string|max:1000',
        ]);

        Testimoni::create([
            'nama' => $request->nama,
            'komentar' => $request->komentar,
        ]);

        return redirect()->back();
    }
}