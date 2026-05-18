import { Head, usePage } from '@inertiajs/react'
import { ShoppingBag } from 'lucide-react'
import PembeliBottomNav from '../../components/pembeli/PembeliBottomNav'
import PembeliHeader from '../../components/pembeli/PembeliHeader'

export default function Akun() {
    const { auth } = usePage().props
    const user = auth?.user

    return (
        <>
            <Head title="Akun" />
            <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <PembeliHeader title="Akun Saya" icon={ShoppingBag} />
                <main style={{ flex: 1, background: '#F0EBC9', padding: 'clamp(24px, 4vw, 40px)' }}>
                    <div style={{
                        maxWidth: 480,
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, #E8E4F5 0%, #F4F3EE 100%)',
                        borderRadius: 20,
                        padding: 28,
                        border: '1px solid #8C4B36',
                    }}>
                        <p style={{ margin: '0 0 8px', fontFamily: '"Antic Didone", serif', fontSize: 14, color: '#8C7B6B' }}>Nama</p>
                        <p style={{ margin: '0 0 20px', fontFamily: '"Antic Didone", serif', fontSize: 24, color: '#1F1A17' }}>{user?.name}</p>
                        <p style={{ margin: '0 0 8px', fontFamily: '"Antic Didone", serif', fontSize: 14, color: '#8C7B6B' }}>Email</p>
                        <p style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 20, color: '#CF611D' }}>{user?.email}</p>
                    </div>
                </main>
                <PembeliBottomNav active="akun" />
            </div>
        </>
    )
}
