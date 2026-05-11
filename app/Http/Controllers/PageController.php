<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function beranda(): Response
    {
        return Inertia::render('Beranda');
    }

    public function tentangKami(): Response
    {
        return Inertia::render('TentangKami');
    }

    public function kontak(): Response
    {
        return Inertia::render('Kontak');
    }
}
