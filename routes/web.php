<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Pembeli\BelanjaController;
use App\Http\Controllers\Pembeli\KeranjangController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Beranda'))->name('beranda');
Route::get('/tentang-kami', fn () => inertia('TentangKami'))->name('tentang-kami');
Route::get('/kontak', fn () => inertia('Kontak'))->name('kontak');

Route::middleware('guest')->group(function () {
    Route::get('/masuk', [AuthController::class, 'showLogin'])->name('masuk');
    Route::post('/masuk', [AuthController::class, 'login'])->name('masuk.store');
    Route::get('/daftar', [AuthController::class, 'showRegister'])->name('daftar');
    Route::post('/daftar', [AuthController::class, 'register'])->name('daftar.store');
});

Route::post('/keluar', [AuthController::class, 'logout'])->middleware('auth')->name('keluar');

Route::middleware(['auth', 'role:pembeli'])->prefix('pembeli')->name('pembeli.')->group(function () {
    Route::get('/belanja', [BelanjaController::class, 'index'])->name('belanja');
    Route::get('/keranjang', [KeranjangController::class, 'index'])->name('keranjang');
    Route::post('/keranjang', [KeranjangController::class, 'store'])->name('keranjang.store');
    Route::patch('/keranjang/{cartItem}', [KeranjangController::class, 'update'])->name('keranjang.update');
    Route::delete('/keranjang/{cartItem}', [KeranjangController::class, 'destroy'])->name('keranjang.destroy');
    Route::get('/akun', fn () => inertia('pembeli/Akun'))->name('akun');
});
