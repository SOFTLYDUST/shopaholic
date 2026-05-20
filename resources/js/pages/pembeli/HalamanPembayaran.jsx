import { Head, Link, useForm } from '@inertiajs/react'
import { Building2, Home, MapPin, Mail, User, Wallet } from 'lucide-react'
import PembeliCard from '../../components/pembeli/PembeliCard'
import PembeliLayout from '../../layouts/PembeliLayout'

const paymentOptions = [
    { value: 'transfer_bank', label: 'Transfer Bank', icon: Building2, desc: 'BCA, Mandiri, BRI' },
    { value: 'e_wallet', label: 'E-wallet', icon: Wallet, desc: 'GoPay, OVO, DANA' },
]

const shippingFields = [
    { key: 'name', label: 'Nama Lengkap', icon: User, placeholder: 'Nama penerima paket' },
    { key: 'address', label: 'Alamat Rumah', icon: Home, placeholder: 'Jl., No., RT/RW' },
    { key: 'city', label: 'Kota Tujuan', icon: MapPin, placeholder: 'Contoh: Malang' },
    { key: 'postal_code', label: 'Kode Pos', icon: Mail, placeholder: '65100' },
]

export default function HalamanPembayaran({
    items = [],
    subtotal_formatted = 'Rp. 0',
    shipping_cost_formatted = 'Rp. 35.000',
    total_formatted = 'Rp. 0',
    shipping = {},
}) {
    const { data, setData, post, processing, errors } = useForm({
        payment_method: 'transfer_bank',
        name: shipping.name ?? '',
        address: shipping.address ?? '',
        city: shipping.city ?? '',
        postal_code: shipping.postal_code ?? '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/pembeli/checkout')
    }

    return (
        <>
            <Head title="Pembayaran" />
            <PembeliLayout
                label="Checkout"
                title="Halaman Pembayaran"
                description="Lengkapi metode pembayaran dan alamat pengiriman untuk menyelesaikan pesanan titip Anda."
                headerAction={
                    <Link href="/pembeli/keranjang" className="pembeli-btn pembeli-btn-outline">
                        Kembali ke Keranjang
                    </Link>
                }
            >
                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 28,
                        alignItems: 'start',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <PembeliCard>
                                <p className="pembeli-label">Langkah 1</p>
                                <h2 style={{
                                    margin: '8px 0 16px',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 24,
                                    fontWeight: 600,
                                }}>
                                    Metode Pembayaran
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {paymentOptions.map((opt) => {
                                        const Icon = opt.icon
                                        const selected = data.payment_method === opt.value
                                        return (
                                            <label
                                                key={opt.value}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 14,
                                                    padding: 16,
                                                    borderRadius: 2,
                                                    border: `1px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
                                                    background: selected ? 'var(--cream)' : 'var(--card)',
                                                    cursor: 'pointer',
                                                    transition: 'border-color 0.2s ease',
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment_method"
                                                    value={opt.value}
                                                    checked={selected}
                                                    onChange={() => setData('payment_method', opt.value)}
                                                    style={{ marginTop: 4, accentColor: 'var(--primary)' }}
                                                />
                                                <Icon size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{opt.label}</p>
                                                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>{opt.desc}</p>
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>
                                {errors.payment_method && (
                                    <p style={{ margin: '12px 0 0', color: 'var(--primary)', fontSize: 13 }}>{errors.payment_method}</p>
                                )}
                            </PembeliCard>

                            <PembeliCard>
                                <p className="pembeli-label">Langkah 2</p>
                                <h2 style={{
                                    margin: '8px 0 16px',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 24,
                                    fontWeight: 600,
                                }}>
                                    Alamat Pengiriman
                                </h2>
                                <div style={{ display: 'grid', gap: 16 }}>
                                    {shippingFields.map((field) => {
                                        const Icon = field.icon
                                        return (
                                            <label key={field.key} style={{ display: 'grid', gap: 6 }}>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    fontSize: 12,
                                                    fontWeight: 600,
                                                    color: 'var(--ink)',
                                                    letterSpacing: 0.5,
                                                }}>
                                                    <Icon size={14} color="var(--primary)" />
                                                    {field.label}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={data[field.key]}
                                                    onChange={(e) => setData(field.key, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="pembeli-input"
                                                    style={errors[field.key] ? { borderColor: 'var(--primary)' } : {}}
                                                />
                                                {errors[field.key] && (
                                                    <span style={{ color: 'var(--primary)', fontSize: 12 }}>{errors[field.key]}</span>
                                                )}
                                            </label>
                                        )
                                    })}
                                </div>
                            </PembeliCard>
                        </div>

                        <PembeliCard accent style={{ position: 'sticky', top: 90 }}>
                            <p className="pembeli-label">Ringkasan Pemesanan</p>
                            <h2 style={{
                                margin: '8px 0 20px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: 24,
                                fontWeight: 600,
                            }}>
                                Detail Pesanan
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                            fontSize: 13,
                                            paddingBottom: 12,
                                            borderBottom: '1px solid var(--border)',
                                        }}
                                    >
                                        <span style={{ color: 'var(--ink)' }}>
                                            {item.product.name} × {item.quantity}
                                        </span>
                                        <span style={{ color: 'var(--primary)', fontWeight: 600, flexShrink: 0 }}>
                                            {item.product.line_total_formatted}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <SummaryRow label="Subtotal" value={subtotal_formatted} />
                            <SummaryRow label="Ongkir" value={shipping_cost_formatted} />
                            <div style={{
                                marginTop: 16,
                                paddingTop: 16,
                                borderTop: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                            }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Total</span>
                                <span style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 26,
                                    color: 'var(--primary)',
                                }}>
                                    {total_formatted}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="pembeli-btn pembeli-btn-primary"
                                style={{ width: '100%', marginTop: 24, padding: '14px 20px', fontSize: 14 }}
                            >
                                {processing ? 'Memproses...' : 'Bayar Sekarang'}
                            </button>
                        </PembeliCard>
                    </div>
                </form>
            </PembeliLayout>
        </>
    )
}

function SummaryRow({ label, value }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontSize: 13,
        }}>
            <span style={{ color: 'var(--muted)' }}>{label}</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{value}</span>
        </div>
    )
}
