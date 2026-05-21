import { Link, router, usePage } from '@inertiajs/react'
import { ClipboardList, Home, LogOut, Package, Settings } from 'lucide-react'
import { penjualLayoutCss, themeCss } from '../theme/shopaholicTheme'

const logoPath = '/img/Logo%20Shopaholic%203.png'

const navItems = [
    { label: 'Dashboard', href: '/penjual', icon: Home, exact: true },
    { label: 'Pesanan', href: '/penjual/pesanan', icon: ClipboardList },
    { label: 'Produk', href: '/penjual/produk', icon: Package },
    { label: 'Pengaturan', href: '/penjual/pengaturan', icon: Settings },
]

export default function PenjualLayout({ children, pageTitle = 'Dashboard Penjual' }) {
    const page = usePage()
    const { auth } = page.props
    const currentUrl = typeof page.url === 'string' ? page.url : ''

    const isActive = (href, exact = false) => {
        if (!href || !currentUrl) return false
        if (exact) return currentUrl === href || currentUrl === `${href}/`
        return currentUrl === href || currentUrl.startsWith(`${href}/`)
    }

    const handleLogout = () => router.post('/keluar')

    return (
        <div className="penjual-shell" style={{ color: 'var(--ink)' }}>
            <style>{themeCss}{penjualLayoutCss}</style>

            <aside className="penjual-sidebar">
                <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid var(--border)' }}>
                    <Link href="/penjual" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <img src={logoPath} alt="Shopaholic" style={{ height: 48, width: 'auto' }} />
                    </Link>
                </div>
                <nav className="penjual-sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href, item.exact)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`penjual-nav-item${active ? ' is-active' : ''}`}
                            >
                                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            <div className="penjual-main">
                <header className="penjual-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <img
                            src={logoPath}
                            alt=""
                            style={{ height: 36, width: 'auto', display: 'none' }}
                            className="penjual-topbar-logo"
                        />
                        <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 20,
                            fontWeight: 600,
                            letterSpacing: 0.3,
                        }}>
                            {pageTitle}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 13, opacity: 0.9, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {auth?.user?.name}
                        </span>
                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Keluar"
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: '1px solid rgba(255,255,255,0.35)',
                                borderRadius: 4,
                                padding: '8px 12px',
                                color: 'inherit',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontFamily: 'var(--font-body)',
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        >
                            <LogOut size={16} />
                            Keluar
                        </button>
                    </div>
                </header>

                <main className="penjual-content">
                    {children}
                </main>
            </div>
        </div>
    )
}
