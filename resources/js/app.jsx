import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'

function showBootError(message) {
    const el = document.getElementById('app')
    if (!el) return
    el.innerHTML = `
        <div style="max-width:480px;margin:48px auto;padding:24px;font-family:system-ui,sans-serif;
            border:1px solid #D8CFC2;border-radius:4px;background:#FEFBF6;color:#1C1916;">
            <p style="margin:0 0 8px;font-weight:600;">Aplikasi gagal dimuat</p>
            <p style="margin:0 0 16px;font-size:14px;color:#8C7B6B;line-height:1.6;">${message}</p>
            <p style="margin:0;font-size:13px;color:#8C7B6B;">
                Pastikan <code>npm run dev</code> berjalan, atau jalankan <code>npm run build</code> lalu refresh halaman.
            </p>
        </div>
    `
}

createInertiaApp({
    id: 'app',
    title: (title) => title ? `${title} — Shopaholic` : 'Shopaholic',
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        const page = pages[`./pages/${name}.jsx`]

        if (!page) {
            throw new Error(`Halaman tidak ditemukan: ${name}`)
        }

        return page.default ?? page
    },
    setup({ el, App, props }) {
        if (!el) {
            showBootError('Elemen #app tidak ditemukan di halaman.')
            return
        }
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#C05A25',
        showSpinner: false,
    },
}).catch((error) => {
    console.error(error)
    showBootError(error?.message ?? 'Terjadi kesalahan saat memuat JavaScript.')
})
