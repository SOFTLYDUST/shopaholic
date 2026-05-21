import { Head, router } from '@inertiajs/react'
import {
    Check,
    CheckCircle2,
    MapPin,
    Package,
    Plane,
    Search,
    ShoppingBag,
    Truck,
} from 'lucide-react'
import { useState } from 'react'
import PembeliCard from '../../components/pembeli/PembeliCard'
import PembeliLayout from '../../layouts/PembeliLayout'

const stepIcons = {
    pesanan_diterima: CheckCircle2,
    barang_dibeli: ShoppingBag,
    tiba_gudang: Package,
    dalam_pengiriman: Truck,
    tiba_indonesia: Plane,
    selesai: Check,
}

export default function HalamanTracking({
    search = '',
    order = null,
    not_found = false,
    recent_orders = [],
    placeholder = 'Contoh: TYA123456789',
}) {
    const [nomor, setNomor] = useState(search)
    const [showDetail, setShowDetail] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const value = nomor.trim()
        router.get('/pembeli/tracking', value ? { nomor: value } : {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const pickRecent = (orderNumber) => {
        setNomor(orderNumber)
        router.get('/pembeli/tracking', { nomor: orderNumber }, { preserveState: true })
    }

    return (
        <>
            <Head title="Tracking Pesanan" />
            <PembeliLayout
                label="Pantau Pesanan"
                title="Tracking Pesanan"
                description="Pantau status pesanan Anda secara real-time. Masukkan nomor pesanan untuk melihat detail dan riwayat pengiriman."
            >
                <section
                    className="pembeli-card"
                    style={{
                        padding: '28px 24px',
                        marginBottom: 28,
                        background: 'linear-gradient(135deg, var(--cream) 0%, var(--card) 100%)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                        <div style={{
                            width: 52,
                            height: 52,
                            borderRadius: 4,
                            background: 'rgba(192, 90, 37, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Package size={26} color="var(--primary)" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h2 style={{
                                margin: 0,
                                fontFamily: 'var(--font-heading)',
                                fontSize: 22,
                                fontWeight: 600,
                                color: 'var(--primary)',
                            }}>
                                Masukkan Nomor Pesanan
                            </h2>
                            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                                Nomor pesanan dikirim setelah pembayaran berhasil
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="pembeli-input"
                            value={nomor}
                            onChange={(e) => setNomor(e.target.value.toUpperCase())}
                            placeholder={placeholder}
                            style={{
                                background: 'rgba(212, 165, 86, 0.15)',
                                borderColor: 'rgba(192, 90, 37, 0.25)',
                                fontSize: 16,
                                letterSpacing: 0.5,
                            }}
                        />
                        <button
                            type="submit"
                            className="pembeli-btn pembeli-btn-primary"
                            style={{ marginTop: 14, width: '100%' }}
                        >
                            <Search size={16} />
                            Lacak Pesanan
                        </button>
                    </form>

                    {not_found && (
                        <p style={{
                            margin: '14px 0 0',
                            fontSize: 13,
                            color: '#9A3B2F',
                            padding: '10px 12px',
                            background: 'rgba(154, 59, 47, 0.08)',
                            borderRadius: 2,
                        }}>
                            Nomor pesanan tidak ditemukan. Periksa kembali atau pilih dari daftar di bawah.
                        </p>
                    )}

                    {recent_orders.length > 0 && !order && (
                        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                            <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                                Pesanan terbaru Anda
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {recent_orders.map((item) => (
                                    <button
                                        key={item.order_number}
                                        type="button"
                                        onClick={() => pickRecent(item.order_number)}
                                        className="pembeli-btn pembeli-btn-ghost"
                                        style={{ fontSize: 12, padding: '8px 12px' }}
                                    >
                                        {item.order_number}
                                        <span style={{ color: 'var(--muted)', fontWeight: 400 }}>
                                            · {item.tracking_status_label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {order && (
                    <>
                        <p className="pembeli-label" style={{ marginBottom: 16 }}>Detail Pesanan</p>
                        <div className="tracking-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(280px, 340px) 1fr',
                            gap: 20,
                            alignItems: 'start',
                        }}>
                            <div style={{
                                background: 'linear-gradient(160deg, #E8F0F4 0%, #EDE8F2 45%, #F5EFE4 100%)',
                                border: '1px solid var(--border)',
                                borderRadius: 4,
                                padding: 24,
                                boxShadow: 'var(--shadow-soft)',
                            }}>
                                <Package size={36} color="var(--primary)" strokeWidth={1.25} style={{ marginBottom: 16 }} />
                                <DetailRow label="Nomor Pesanan" value={order.order_number} highlight />
                                <DetailRow label="Tanggal Order" value={order.ordered_at} />
                                <DetailRow label="Layanan" value={order.service_name} />
                                <DetailRow
                                    label="Negara Tujuan"
                                    value={
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                            <span aria-hidden>🇮🇩</span>
                                            {order.destination_country}
                                        </span>
                                    }
                                />
                                {order.source_country && (
                                    <DetailRow label="Asal Pembelian" value={order.source_country} />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowDetail((v) => !v)}
                                    className="pembeli-btn"
                                    style={{
                                        marginTop: 20,
                                        width: '100%',
                                        background: 'rgba(192, 90, 37, 0.85)',
                                        borderColor: 'transparent',
                                        color: 'var(--cream)',
                                    }}
                                >
                                    {showDetail ? 'Sembunyikan Detail' : 'Lihat Detail Pesanan'}
                                </button>
                                {showDetail && (
                                    <div style={{
                                        marginTop: 16,
                                        paddingTop: 16,
                                        borderTop: '1px solid rgba(216, 207, 194, 0.6)',
                                    }}>
                                        {order.items.map((item, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    fontSize: 13,
                                                    marginBottom: 8,
                                                    color: 'var(--ink)',
                                                }}
                                            >
                                                <span>{item.name} × {item.quantity}</span>
                                                <span style={{ color: 'var(--muted)' }}>{item.line_total_formatted}</span>
                                            </div>
                                        ))}
                                        <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                                            Total: {order.total_formatted}
                                        </p>
                                        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                                            Pembayaran: {order.payment_method}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <PembeliCard style={{ padding: 24 }}>
                                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 24 }}>
                                    <div style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 4,
                                        background: 'rgba(212, 165, 86, 0.25)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Truck size={24} color="var(--gold)" />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>Status Saat Ini</p>
                                        <p style={{
                                            margin: '4px 0 0',
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: 20,
                                            fontWeight: 600,
                                            color: 'var(--primary)',
                                            lineHeight: 1.3,
                                        }}>
                                            {order.tracking_status_text}
                                        </p>
                                        <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                                            Terakhir diperbarui {order.last_updated}
                                        </p>
                                    </div>
                                </div>

                                <HorizontalSteps steps={order.steps} />

                                <div style={{ marginTop: 28 }}>
                                    <p style={{
                                        margin: '0 0 16px',
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 18,
                                        fontWeight: 600,
                                    }}>
                                        Riwayat Tracking
                                    </p>
                                    <TrackingHistory history={order.history} />
                                </div>
                            </PembeliCard>
                        </div>
                    </>
                )}

                {!order && !not_found && search === '' && (
                    <PembeliCard style={{ textAlign: 'center', padding: '40px 24px' }}>
                        <MapPin size={32} color="var(--muted)" strokeWidth={1.5} style={{ margin: '0 auto 12px' }} />
                        <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                            Masukkan nomor pesanan untuk melihat status dan riwayat pengiriman.
                            <br />
                            Contoh demo: <strong style={{ color: 'var(--primary)' }}>TYA123456789</strong>
                        </p>
                    </PembeliCard>
                )}

                <style>{`
                    @media (max-width: 900px) {
                        .tracking-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </PembeliLayout>
        </>
    )
}

function DetailRow({ label, value, highlight = false }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{label}</p>
            <p style={{
                margin: '4px 0 0',
                fontSize: highlight ? 18 : 14,
                fontWeight: highlight ? 700 : 500,
                fontFamily: highlight ? 'var(--font-heading)' : 'var(--font-body)',
                color: highlight ? 'var(--primary)' : 'var(--ink)',
            }}>
                {value}
            </p>
        </div>
    )
}

function HorizontalSteps({ steps }) {
    return (
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 0,
                minWidth: 560,
                position: 'relative',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: '8%',
                    right: '8%',
                    height: 3,
                    background: 'var(--border)',
                    zIndex: 0,
                }} />
                <div style={{
                    position: 'absolute',
                    top: 20,
                    left: '8%',
                    height: 3,
                    background: 'var(--primary)',
                    zIndex: 1,
                    width: `${(steps.filter((s) => s.done).length - 1) / Math.max(steps.length - 1, 1) * 84}%`,
                    maxWidth: '84%',
                    transition: 'width 0.3s ease',
                }} />
                {steps.map((step) => {
                    const Icon = stepIcons[step.key] ?? Package
                    return (
                        <div
                            key={step.key}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                zIndex: 2,
                                padding: '0 4px',
                            }}
                        >
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: step.active
                                    ? 'var(--primary)'
                                    : step.done
                                        ? 'rgba(192, 90, 37, 0.2)'
                                        : 'var(--cream)',
                                border: `2px solid ${step.active || step.done ? 'var(--primary)' : 'var(--border)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Icon
                                    size={18}
                                    color={step.active ? 'var(--cream)' : step.done ? 'var(--primary)' : 'var(--muted)'}
                                    strokeWidth={2}
                                />
                            </div>
                            <p style={{
                                margin: '10px 0 0',
                                fontSize: 10,
                                lineHeight: 1.35,
                                color: step.active ? 'var(--primary)' : step.done ? 'var(--ink)' : 'var(--muted)',
                                fontWeight: step.active ? 600 : 400,
                                maxWidth: 72,
                            }}>
                                {step.label}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function TrackingHistory({ history }) {
    if (!history?.length) {
        return <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Belum ada riwayat.</p>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {history.map((event, index) => (
                <div
                    key={`${event.occurred_at}-${index}`}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 24px 1fr',
                        gap: 12,
                        paddingBottom: index < history.length - 1 ? 20 : 0,
                    }}
                >
                    <time style={{
                        fontSize: 12,
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                        whiteSpace: 'nowrap',
                    }}>
                        {event.occurred_at}
                    </time>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <span style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: index === 0 ? 'var(--primary)' : 'var(--border)',
                            border: index === 0 ? '3px solid rgba(192, 90, 37, 0.25)' : 'none',
                            flexShrink: 0,
                            marginTop: 4,
                        }} />
                        {index < history.length - 1 && (
                            <span style={{
                                position: 'absolute',
                                top: 18,
                                bottom: -20,
                                width: 2,
                                background: 'var(--border)',
                            }} />
                        )}
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                            {event.title}
                        </p>
                        {event.location && (
                            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--primary)' }}>
                                {event.location}
                            </p>
                        )}
                        {event.description && (
                            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                                {event.description}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
