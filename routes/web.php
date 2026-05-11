<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Beranda'))->name('beranda');
Route::get('/tentang-kami', fn() => inertia('TentangKami'))->name('tentang-kami');
Route::get('/kontak', fn() => inertia('Kontak'))->name('kontak');
Route::get('/masuk', fn() => inertia('Masuk'))->name('masuk');
Route::get('/daftar', fn() => inertia('Daftar'))->name('daftar');
