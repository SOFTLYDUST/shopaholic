import { MapPin } from 'lucide-react'

export default function ProductCard({ product, onAddToCart }) {
    return (
        <article
            className="pembeli-card"
            style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)'
                e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            <div style={{
                aspectRatio: '1',
                background: 'var(--cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
            }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--primary)',
                    fontWeight: 600,
                }}>
                    {product.category}
                </span>
                <h3 style={{
                    margin: '6px 0 4px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: 'var(--ink)',
                }}>
                    {product.name}
                </h3>
                <p style={{
                    margin: '0 0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    color: 'var(--muted)',
                }}>
                    <MapPin size={12} />
                    Dikirim dari {product.shipping_from}
                </p>
                <p style={{
                    margin: '0 0 14px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 17,
                    color: 'var(--primary)',
                }}>
                    {product.price_formatted}
                </p>
                <button
                    type="button"
                    onClick={() => onAddToCart(product.id)}
                    className="pembeli-btn pembeli-btn-primary"
                    style={{ width: '100%', marginTop: 'auto' }}
                >
                    Titip Produk Ini
                </button>
            </div>
        </article>
    )
}
