import { Head, Link, router } from '@inertiajs/react'
import { Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import PembeliCard from '../../components/pembeli/PembeliCard'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function KeranjangBelanja({ items = [], subtotal_formatted = 'Rp. 0' }) {
    const increment = (id) => router.patch(`/pembeli/keranjang/${id}`, {}, { preserveScroll: true })
    const remove = (id) => router.delete(`/pembeli/keranjang/${id}`, { preserveScroll: true })

    return (
        <>
            <Head title="Keranjang" />
            <PembeliLayout
                label="Pesanan Anda"
                title="Keranjang Belanja"
                description="Review produk yang akan dititipkan sebelum melanjutkan ke pembayaran."
                headerAction={items.length > 0 ? (
                    <Link href="/pembeli/belanja" className="pembeli-btn pembeli-btn-outline">
                        <ShoppingBag size={16} />
                        Lanjut Belanja
                    </Link>
                ) : null}
            >
                {items.length === 0 ? (
                    <PembeliCard style={{ textAlign: 'center', padding: 56 }}>
                        <ShoppingCart size={40} color="var(--muted)" strokeWidth={1.2} style={{ margin: '0 auto 16px' }} />
                        <h2 style={{
                            margin: '0 0 8px',
                            fontFamily: 'var(--font-heading)',
                            fontSize: 26,
                            fontWeight: 600,
                        }}>
                            Keranjang masih kosong
                        </h2>
                        <p style={{ margin: '0 0 24px', color: 'var(--muted)', fontSize: 14 }}>
                            Mulai pilih produk dari katalog titip kami.
                        </p>
                        <Link href="/pembeli/belanja" className="pembeli-btn pembeli-btn-primary">
                            Mulai Belanja
                        </Link>
                    </PembeliCard>
                ) : (
                    <div className="keranjang-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 320px)', gap: 28, alignItems: 'start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {items.map((item) => (
                                <PembeliCard key={item.id} style={{ padding: 0, overflow: 'hidden' }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '120px minmax(0, 1fr) auto',
                                        gap: 0,
                                        alignItems: 'stretch',
                                    }}>
                                        <div style={{
                                            background: 'var(--cream)',
                                            padding: 12,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRight: '1px solid var(--border)',
                                        }}>
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                style={{ width: '100%', height: 96, objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div style={{ padding: '16px 20px', minWidth: 0 }}>
                                            <p className="pembeli-label" style={{ marginBottom: 6 }}>Produk Titip</p>
                                            <h3 style={{
                                                margin: 0,
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 20,
                                                fontWeight: 600,
                                                lineHeight: 1.3,
                                            }}>
                                                {item.product.name}
                                            </h3>
                                            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                                                {item.product.price_formatted}
                                                {item.quantity > 1 && ` × ${item.quantity}`}
                                            </p>
                                            <p style={{
                                                margin: '10px 0 0',
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 18,
                                                color: 'var(--primary)',
                                            }}>
                                                {item.product.line_total_formatted}
                                            </p>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            gap: 8,
                                            padding: '12px 16px',
                                            borderLeft: '1px solid var(--border)',
                                        }}>
                                            <button
                                                type="button"
                                                onClick={() => increment(item.id)}
                                                className="pembeli-btn pembeli-btn-ghost"
                                                style={{ padding: 8 }}
                                                aria-label="Tambah jumlah"
                                            >
                                                <Plus size={18} color="var(--primary)" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => remove(item.id)}
                                                className="pembeli-btn pembeli-btn-ghost"
                                                style={{ padding: 8 }}
                                                aria-label="Hapus"
                                            >
                                                <Trash2 size={18} color="var(--muted)" />
                                            </button>
                                        </div>
                                    </div>
                                </PembeliCard>
                            ))}
                        </div>

                        <PembeliCard accent style={{ position: 'sticky', top: 90 }}>
                            <p className="pembeli-label">Ringkasan</p>
                            <h3 style={{
                                margin: '8px 0 20px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 22,
                                fontWeight: 600,
                            }}>
                                Total Sementara
                            </h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 24,
                                paddingBottom: 20,
                                borderBottom: '1px solid var(--border)',
                            }}>
                                <span style={{ fontSize: 14, color: 'var(--muted)' }}>Subtotal</span>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 22,
                                    color: 'var(--primary)',
                                }}>
                                    {subtotal_formatted}
                                </span>
                            </div>
                            <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                                Ongkir internasional & domestik dihitung pada halaman pembayaran.
                            </p>
                            <Link href="/pembeli/checkout" className="pembeli-btn pembeli-btn-primary" style={{ width: '100%' }}>
                                <ShoppingCart size={18} />
                                Lanjut Checkout
                            </Link>
                        </PembeliCard>
                    </div>
                )}

                <style>{`
                    @media (max-width: 768px) {
                        .keranjang-grid { grid-template-columns: 1fr !important; }
                    }
                `}</style>
            </PembeliLayout>
        </>
    )
}
