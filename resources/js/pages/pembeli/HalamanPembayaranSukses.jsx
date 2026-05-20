import { Head, Link } from '@inertiajs/react'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import PembeliCard from '../../components/pembeli/PembeliCard'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function HalamanPembayaranSukses({ order }) {
    return (
        <>
            <Head title="Pembayaran Sukses" />
            <PembeliLayout
                label="Selesai"
                title="Pembayaran Berhasil"
                description="Terima kasih! Pesanan titip Anda sedang diproses. Tim kami akan segera menghubungi Anda."
            >
                <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '32px 24px',
                        background: 'var(--cream)',
                        border: '1px solid var(--border)',
                        borderRadius: 4,
                    }}>
                        <CheckCircle size={48} color="var(--primary)" strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
                        <h2 style={{
                            margin: '0 0 8px',
                            fontFamily: 'var(--font-heading)',
                            fontSize: 28,
                            fontWeight: 600,
                            color: 'var(--primary)',
                        }}>
                            Pembayaran Sukses
                        </h2>
                        <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                            Pesanan #{order.id} telah kami terima. Proses pembelian produk dari luar negeri akan segera dimulai.
                        </p>
                    </div>

                    <PembeliCard>
                        <p className="pembeli-label">Ringkasan Pesanan</p>
                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {order.items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: 14,
                                        paddingBottom: 10,
                                        borderBottom: i < order.items.length - 1 ? '1px solid var(--border)' : 'none',
                                    }}
                                >
                                    <span>{item.name} × {item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            marginTop: 20,
                            paddingTop: 16,
                            borderTop: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                        }}>
                            <span style={{ fontSize: 14, color: 'var(--muted)' }}>Total dibayar</span>
                            <span style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 24,
                                color: 'var(--primary)',
                            }}>
                                {order.total_formatted}
                            </span>
                        </div>
                        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                            Metode: {order.payment_method}
                        </p>
                    </PembeliCard>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                        <Link href="/pembeli/belanja" className="pembeli-btn pembeli-btn-primary">
                            <ShoppingBag size={16} />
                            Belanja Lagi
                        </Link>
                        <Link href="/" className="pembeli-btn pembeli-btn-outline">
                            Ke Beranda
                        </Link>
                    </div>
                </div>
            </PembeliLayout>
        </>
    )
}
