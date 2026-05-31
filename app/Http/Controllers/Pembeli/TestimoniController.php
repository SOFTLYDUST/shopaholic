<?php

namespace App\Http\Controllers\Pembeli;

use App\Http\Controllers\Controller;
use App\Models\Testimoni;
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
}