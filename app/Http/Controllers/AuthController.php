<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Masuk');
    }

    public function showRegister(): Response
    {
        return Inertia::render('Daftar');
    }

    public function login(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'role' => ['nullable', 'in:pembeli,penjual'],
        ]);

        if (! Auth::attempt(
            ['email' => $validated['email'], 'password' => $validated['password']],
            $request->boolean('remember'),
        )) {
            throw ValidationException::withMessages([
                'email' => 'Email atau password salah.',
            ]);
        }

        $user = Auth::user();

        if (empty($validated['role'])) {
            Auth::logout();

            throw ValidationException::withMessages([
                'role' => 'Pilih peran pembeli atau penjual.',
            ]);
        }

        if ($user->role !== $validated['role']) {
            Auth::logout();

            throw ValidationException::withMessages([
                'email' => 'Akun ini tidak terdaftar sebagai '.($validated['role'] === 'pembeli' ? 'pembeli' : 'penjual').'.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended($this->homeRouteFor($user));
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'confirmed', Password::min(8)],
            'role' => ['required', 'in:pembeli,penjual'],
        ]);

        $user = User::create($validated);

        Auth::login($user);

        $request->session()->regenerate();

        return redirect()->route($this->homeRouteNameFor($user));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('masuk');
    }

    private function homeRouteFor(User $user): string
    {
        return route($this->homeRouteNameFor($user));
    }

    private function homeRouteNameFor(User $user): string
    {
        return match ($user->role) {
            'pembeli' => 'pembeli.belanja',
            'penjual' => 'penjual.dashboard',
            default => 'beranda',
        };
    }
}
