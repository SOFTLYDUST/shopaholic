import { Link, router, usePage } from '@inertiajs/react'
import { LogOut, ShoppingCart } from 'lucide-react'

const logoPath = '/img/Logo%20Shopaholic%203.png'

export default function PembeliHeader({ title, icon: Icon = ShoppingCart, variant = 'belanja' }) {
    const { cart } = usePage().props
    const cartCount = cart?.count ?? 0

    const handleLogout = () => router.post('/keluar')

    return (
        <header style={{
            background: '#A62037',
            color: '#F7F2DE',
            padding: '0 clamp(12px, 3vw, 24px)',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
        }}>
            <Link href="/pembeli/belanja" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <img src={logoPath} alt="Shopaholic" style={{ height: 48, width: 'auto' }} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"Antic Didone", serif', fontSize: 'clamp(18px, 2.5vw, 24px)' }}>
                {variant === 'keranjang' && (
                    <div style={{ position: 'relative' }}>
                        <ShoppingCart size={22} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute', top: -6, right: -10,
                                background: '#F7F2DE', color: '#A62037',
                                borderRadius: '50%', width: 18, height: 18,
                                fontSize: 11, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: '"Plus Jakarta Sans", sans-serif',
                            }}>{cartCount}</span>
                        )}
                    </div>
                )}
                {variant === 'belanja' && <Icon size={22} strokeWidth={1.5} />}
                <span>{title}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {variant === 'belanja' && (
                <Link href="/pembeli/keranjang" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"Antic Didone", serif', fontSize: 'clamp(14px, 2vw, 18px)', color: '#F7F2DE', textDecoration: 'none' }}>
                    <div style={{ position: 'relative' }}>
                        <ShoppingCart size={22} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute', top: -6, right: -8,
                                background: '#F7F2DE', color: '#A62037',
                                borderRadius: '50%', width: 18, height: 18,
                                fontSize: 11, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: '"Plus Jakarta Sans", sans-serif',
                            }}>{cartCount}</span>
                        )}
                    </div>
                    <span>Keranjang</span>
                </Link>
                )}
                <button type="button" onClick={handleLogout} aria-label="Keluar" style={{
                    border: 'none', background: 'rgba(255,255,255,0.15)', color: '#F7F2DE', cursor: 'pointer',
                    padding: 8, borderRadius: '50%', display: 'inline-flex',
                }}>
                    <LogOut size={20} strokeWidth={1.5} />
                </button>
            </div>
        </header>
    )
}

