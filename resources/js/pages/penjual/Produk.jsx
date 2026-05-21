import { Head } from '@inertiajs/react'
import PenjualLayout from '../../layouts/PenjualLayout'

export default function Produk({ products = [] }) {
    return (
        <>
            <Head title="Produk" />
            <PenjualLayout pageTitle="Produk">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 16,
                }}>
                    {products.length === 0 ? (
                        <p style={{ gridColumn: '1 / -1', color: 'var(--muted)', fontSize: 14 }}>Belum ada produk.</p>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="pembeli-card"
                                style={{ padding: 20 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                                    <h3 style={{
                                        margin: 0,
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        lineHeight: 1.3,
                                    }}>
                                        {product.name}
                                    </h3>
                                    <span style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        padding: '4px 8px',
                                        borderRadius: 2,
                                        background: product.is_active ? 'rgba(45, 106, 79, 0.12)' : 'rgba(140, 123, 107, 0.15)',
                                        color: product.is_active ? '#2D6A4F' : 'var(--muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                        flexShrink: 0,
                                    }}>
                                        {product.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>{product.category}</p>
                                <p style={{ margin: '12px 0 0', fontSize: 16, fontWeight: 600, color: 'var(--primary)' }}>
                                    {product.price_formatted}
                                </p>
                                <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                                    Dikirim dari {product.shipping_from}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </PenjualLayout>
        </>
    )
}
