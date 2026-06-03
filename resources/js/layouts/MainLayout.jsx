import { Link, usePage } from '@inertiajs/react'

const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/tentang-kami' },
    { label: 'Kontak', href: '/kontak' },
]
const logoPath = '/img/Logo%20Shopaholic%203.png'

export default function MainLayout({ children }) {
    const page = usePage()
    const { auth } = page.props
    const currentUrl = typeof page.url === 'string' ? page.url : ''
    const user = auth?.user

    const isActive = (path) => {
        if (!path || !currentUrl) return false
        return currentUrl === path || currentUrl.startsWith(`${path}/`)
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--ink)' }}>
            <style>{`
                :root {
                    --bg: #FEFBF6;
                    --card: #FEFBF6;
                    --border: #D8CFC2;
                    --primary: #C05A25;
                    --gold: #D4A556;
                    --cream: #F5EFE4;
                    --ink: #1C1916;
                    --muted: #8C7B6B;
                    --shadow-soft: 0 6px 18px rgba(28, 25, 22, 0.08);
                    --font-heading: "Antic Didone", serif;
                    --font-body: "Plus Jakarta Sans", sans-serif;
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    background: var(--bg);
                    color: var(--ink);
                    font-family: var(--font-body);
                }
                a { color: inherit; }
                .container {
                    width: min(1200px, 100%);
                    margin: 0 auto;
                    padding: 0 48px;
                }
                .section {
                    padding: 80px 48px;
                    border-bottom: 1px solid var(--border);
                }
                .label {
                    color: var(--primary);
                    font-size: 11px;
                    letter-spacing: 2.5px;
                    text-transform: uppercase;
                    font-weight: 600;
                }
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    border-radius: 2px;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 10px 16px;
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                }
                .btn-outline {
                    border-color: var(--ink);
                    color: var(--ink);
                    background: transparent;
                }
                .btn-outline:hover {
                    border-color: var(--primary);
                    color: var(--primary);
                }
                .btn-primary {
    background: #6D071A;
    border-color: #6D071A;
    color: #F5EFE4;
}

.btn-primary:hover {
    background: #550515;
    border-color: #550515;
}
                .footer-grid {
                    display: grid;
                    gap: 24px;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                }
                .nav-logo img {
                    height: 105px;
                    width: auto;
                    display: block;
                }
                .nav-actions {
                    position: relative;
                    z-index: 10;
                }
                @media (max-width: 768px) {
                    .container { padding: 0 20px; }
                    .section { padding: 64px 20px; }
                    .nav-center { display: none; }
                    .nav-actions { gap: 8px; }
                }
            `}</style>

            <nav
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 20,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    background: 'rgba(254, 251, 246, 0.88)',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                <div className="container" style={{ minHeight: 72, display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 16 }}>
                    <Link href="/" className="nav-logo" style={{ textDecoration: 'none', justifySelf: 'start', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                        <img src={logoPath} alt="Shopaholic" />
                    </Link>

                    <div className="nav-center" style={{ display: 'flex', gap: 20, alignItems: 'center', justifySelf: 'center' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    textDecoration: 'none',
                                    fontSize: 13,
                                    color: isActive(link.href) ? 'var(--ink)' : 'var(--muted)',
                                    borderBottom: isActive(link.href) ? '1px solid var(--primary)' : '1px solid transparent',
                                    paddingBottom: 6,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="nav-actions" style={{ justifySelf: 'end', display: 'flex', gap: 10, flexShrink: 0 }}>
                        {user ? (
                            <Link
                                href={user.role === 'pembeli' ? '/pembeli/belanja' : '/penjual'}
                                className="btn btn-primary"
                            >
                                {user.role === 'pembeli' ? 'Ke Belanja' : 'Dashboard'}
                            </Link>
                        ) : (
                            <>
                                <a href="/masuk" className="btn btn-outline" data-inertia-link="false">Masuk</a>
                                <a href="/daftar" className="btn btn-primary" data-inertia-link="false">Daftar</a>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer
    style={{
        background: '#6D071A',
        borderTop: '1px solid rgba(255,255,255,0.15)',
    }}
>
    <div className="container" style={{ paddingTop: 56, paddingBottom: 34 }}>
        <div className="footer-grid">
            <div>
                <img
                    src={logoPath}
                    alt="Shopaholic"
                    style={{
                        height: 150,
                        width: 'auto',
                        display: 'block',
                        marginBottom: 12,
                        transform: 'translateY(-15px)',
                    }}
                />

                <p
                    style={{
                        margin: 0,
                        color: '#F3E6E8',
                        fontSize: 13,
                        lineHeight: 1.8,
                        maxWidth: 370,
                    }}
                >
                    Solusi belanja produk luar negeri yang mudah, aman, dan terpercaya untuk seluruh Indonesia.
                </p>
            </div>

            <div>
                <p
                    style={{
                        margin: '0 0 14px 0',
                        color: '#FFFFFF',
                        fontSize: 12,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                    }}
                >
                    Tentang Kami
                </p>

                <div style={{ display: 'grid', gap: 10 }}>
                    <Link href="/tentang-kami" style={{ textDecoration: 'none', color: '#F3E6E8', fontSize: 13 }}>
                        Tentang Shopaholic
                    </Link>

                    <Link href="/tentang-kami" style={{ textDecoration: 'none', color: '#F3E6E8', fontSize: 13 }}>
                        Visi &amp; Misi Shopaholic
                    </Link>

                    <Link href="/tentang-kami" style={{ textDecoration: 'none', color: '#F3E6E8', fontSize: 13 }}>
                        Filosofi
                    </Link>
                </div>
            </div>

            <div>
                <p
                    style={{
                        margin: '0 0 14px 0',
                        color: '#FFFFFF',
                        fontSize: 12,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                    }}
                >
                    Quick Links
                </p>

                <div style={{ display: 'grid', gap: 10 }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#F3E6E8', fontSize: 13 }}>
                        Mulai Titip
                    </Link>

                    <Link href="/kontak" style={{ textDecoration: 'none', color: '#F3E6E8', fontSize: 13 }}>
                        Hubungi Kami
                    </Link>
                </div>
            </div>
        </div>

        <div
            style={{
                borderTop: '1px solid rgba(255,255,255,0.15)',
                marginTop: 34,
                paddingTop: 18,
                color: '#F3E6E8',
                fontSize: 12,
            }}
        >
            © 2026 Shopaholic. All rights reserved.
        </div>
    </div>
</footer>
        </div>
    )
}
