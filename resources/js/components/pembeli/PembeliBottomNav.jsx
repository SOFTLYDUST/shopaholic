import { Link } from '@inertiajs/react'
import { LayoutGrid, User } from 'lucide-react'

export default function PembeliBottomNav({ active = 'home' }) {
    const navBtn = (isActive) => ({
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 52,
        borderRadius: 14,
        background: '#A62037',
        color: '#F7F2DE',
        fontFamily: '"Antic Didone", serif',
        fontSize: 'clamp(16px, 2vw, 22px)',
        textDecoration: 'none',
        border: isActive ? '2px solid #F7F2DE' : '2px solid transparent',
        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
    })

    return (
        <nav style={{
            display: 'flex',
            gap: 12,
            padding: '12px clamp(12px, 3vw, 24px) 20px',
            background: '#F0EBC9',
            flexShrink: 0,
        }}>
            <Link href="/pembeli/belanja" style={navBtn(active === 'home')}>
                <LayoutGrid size={22} strokeWidth={1.5} />
                HOME
            </Link>
            <Link href="/pembeli/akun" style={navBtn(active === 'akun')}>
                <User size={22} strokeWidth={1.5} />
                AKUN
            </Link>
        </nav>
    )
}
