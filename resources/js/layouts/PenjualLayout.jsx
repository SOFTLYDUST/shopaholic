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

            <aside
                className="penjual-sidebar"
                style={{
                    background: 'linear-gradient(180deg,#6E1418,#7D1B20,#8A2328)',
                    borderRight: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div
                    style={{
                        height: 74,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.12)',
                        background: 'linear-gradient(180deg,#6E1418,#7D1B20,#8A2328)',
                    }}
                >
                    <Link
                        href="/penjual"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                        }}
                    >
                        <img
                            src={logoPath}
                            alt="Shopaholic"
                            style={{
                                height: 88,
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
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
                                style={{
                                    color: active ? '#5C3B2E' : '#FFFFFF',
                                    margin: '6px 12px',
                                    borderRadius: 14,
                                    padding: '14px 18px',
                                    transition: '0.25s ease',
                                    background: active
                                        ? 'linear-gradient(135deg,#D6ECFF,#FDF6EC,#E8F4FF)'
                                        : 'linear-gradient(135deg,rgba(214,236,255,0.12),rgba(253,246,236,0.06))',
                                    borderLeft: active
                                        ? '3px solid #A9D6FF'
                                        : '3px solid transparent',
                                    backdropFilter: active ? 'blur(6px)' : 'none',
                                }}
                            >
                                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            <div className="penjual-main">
                <header
                    className="penjual-topbar"
                    style={{
                        background: 'linear-gradient(90deg,#6E1418,#7D1B20,#8A2328)',
                        color: '#FFFFFF',
                        borderBottom: '1px solid rgba(255,255,255,0.12)',
                        height: 74,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 28px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 20,
                                fontWeight: 600,
                                letterSpacing: 0.3,
                            }}
                        >
                            {pageTitle}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span
                            style={{
                                fontSize: 13,
                                opacity: 0.9,
                                maxWidth: 160,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {auth?.user?.name}
                        </span>

                        <button
                            type="button"
                            onClick={handleLogout}
                            aria-label="Keluar"
                            style={{
                                background: 'rgba(255,255,255,0.10)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                borderRadius: 10,
                                padding: '8px 14px',
                                color: '#FFFFFF',
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