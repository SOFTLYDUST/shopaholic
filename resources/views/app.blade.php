<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Shopaholic') }}</title>

        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Antic+Didone&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body>
        @inertia
        <noscript>
            <div style="max-width:480px;margin:48px auto;padding:24px;font-family:system-ui,sans-serif;text-align:center;">
                <p style="font-weight:600;">JavaScript diperlukan untuk menjalankan Shopaholic.</p>
                <p style="margin-top:12px;"><a href="/masuk" style="color:#C05A25;">Buka halaman Masuk</a></p>
            </div>
        </noscript>
    </body>
</html>
