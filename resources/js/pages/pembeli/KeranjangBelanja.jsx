import { Head, Link, router } from '@inertiajs/react'
import { Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import PembeliBottomNav from '../../components/pembeli/PembeliBottomNav'
import PembeliHeader from '../../components/pembeli/PembeliHeader'

const cardGradient = 'linear-gradient(180deg, #D4DCE8 0%, #F4F3EE 100%)'

export default function KeranjangBelanja({ items = [], subtotal_formatted = 'Rp. 0' }) {
    const increment = (id) => router.patch(`/pembeli/keranjang/${id}`, {}, { preserveScroll: true })
    const remove = (id) => router.delete(`/pembeli/keranjang/${id}`, { preserveScroll: true })

    return (
        <>
            <Head title="Keranjang Belanja" />
            <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <PembeliHeader title="Keranjang Belanja" variant="keranjang" />
                <main style={{ flex: 1, background: '#F0EBC9', padding: 'clamp(16px, 2.5vw, 28px)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <Link href="/pembeli/belanja" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '10px 18px', borderRadius: 12, background: '#E8A4B8',
                            color: '#A62037', fontFamily: '"Antic Didone", serif', fontSize: 16,
                            textDecoration: 'none', border: '1px solid #8C4B36',
                        }}>
                            <ShoppingBag size={18} />
                            Belanja Lagi
                        </Link>
                    </div>

                    {items.length === 0 ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
                            <ShoppingCart size={48} color="#8C7B6B" strokeWidth={1.2} />
                            <p style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 22, color: '#8C7B6B' }}>Keranjang masih kosong</p>
                            <Link href="/pembeli/belanja" style={{
                                padding: '12px 24px', borderRadius: 12, background: '#A62037', color: '#F7F2DE',
                                fontFamily: '"Antic Didone", serif', fontSize: 18, textDecoration: 'none',
                            }}>Mulai Belanja</Link>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {items.map((item, index) => (
                                    <div key={item.id}>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'minmax(100px, 140px) 1fr auto',
                                            gap: 16,
                                            alignItems: 'center',
                                            padding: '16px 0',
                                        }}>
                                            <div style={{
                                                background: cardGradient, borderRadius: 16, padding: 12,
                                                aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '1px solid rgba(140, 75, 54, 0.25)',
                                            }}>
                                                <img src={item.product.image} alt={item.product.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{
                                                background: cardGradient, borderRadius: 16, padding: '14px 20px',
                                                border: '1px solid rgba(140, 75, 54, 0.25)', minWidth: 0,
                                            }}>
                                                <p style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 'clamp(16px, 2vw, 22px)', color: '#CF611D', borderBottom: '2px solid #A62037', paddingBottom: 8 }}>
                                                    {item.product.name}
                                                </p>
                                                <p style={{ margin: '10px 0 0', fontFamily: '"Antic Didone", serif', fontSize: 'clamp(15px, 1.8vw, 20px)', color: '#CF611D' }}>
                                                    {item.product.price_formatted}
                                                    {item.quantity > 1 && (
                                                        <span style={{ fontSize: 14, color: '#8C7B6B' }}> × {item.quantity}</span>
                                                    )}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                                                <button type="button" onClick={() => increment(item.id)} aria-label="Tambah jumlah" style={actionBtnStyle}>
                                                    <Plus size={22} color="#3B6FD9" strokeWidth={2.5} />
                                                </button>
                                                <button type="button" onClick={() => remove(item.id)} aria-label="Hapus" style={actionBtnStyle}>
                                                    <Trash2 size={22} color="#3B6FD9" strokeWidth={1.8} />
                                                </button>
                                            </div>
                                        </div>
                                        {index < items.length - 1 && (
                                            <hr style={{ border: 'none', borderTop: '1px solid rgba(140, 75, 54, 0.3)', margin: 0 }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                marginTop: 'auto', paddingTop: 24,
                                display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                            }}>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    padding: '12px 20px', borderRadius: 12, background: cardGradient,
                                    border: '1px solid rgba(140, 75, 54, 0.25)',
                                    fontFamily: '"Antic Didone", serif', fontSize: 20, color: '#1F1A17',
                                }}>
                                    <Plus size={20} color="#3B6FD9" />
                                    Subtotal
                                </div>
                                <div style={{
                                    padding: '12px 24px', borderRadius: 12, background: '#F4F3EE',
                                    border: '1px solid #8C4B36',
                                    fontFamily: '"Antic Didone", serif', fontSize: 'clamp(18px, 2.2vw, 24px)', color: '#CF611D',
                                }}>
                                    {subtotal_formatted}
                                </div>
                            </div>

                            <button type="button" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                width: '100%', maxWidth: 420, margin: '20px auto 0',
                                padding: '14px 24px', borderRadius: 16,
                                background: 'linear-gradient(180deg, #F4F3EE 0%, #E8E4F5 100%)',
                                border: '1px solid #8C4B36',
                                fontFamily: '"Antic Didone", serif', fontSize: 'clamp(18px, 2.5vw, 24px)',
                                color: '#1F1A17', cursor: 'pointer',
                            }}>
                                <ShoppingCart size={22} />
                                Chekout
                            </button>
                        </>
                    )}
                </main>
                <PembeliBottomNav active="home" />
            </div>
        </>
    )
}

const actionBtnStyle = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 4,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
}
