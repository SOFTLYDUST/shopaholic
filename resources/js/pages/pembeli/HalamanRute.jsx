import { Head, Link } from '@inertiajs/react'
import { MapPin, RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import RouteMap from '../../components/pembeli/RouteMap'
import TripCard from '../../components/pembeli/TripCard'
import PembeliLayout from '../../layouts/PembeliLayout'

const statusStyles = {
    persiapan: { bg: '#E8E4DF', color: '#5C5348' },
    open_po: { bg: '#E8F0EC', color: '#2D6A4F' },
    checkout: { bg: '#F5EFE4', color: '#9A6B2F' },
    sedang_di_perjalanan: { bg: '#FCEEE6', color: '#A84E21' },
    sudah_kembali: { bg: '#F0F0EE', color: '#8C7B6B' },
}

export default function HalamanRute({
    current_trips = [],
    upcoming_trips = [],
    selected_trip = null,
    status_legend = [],
}) {
    const [selected, setSelected] = useState(selected_trip)

    const timeline = useMemo(() => {
        if (!selected) return []
        const items = [
            { key: 'departure', label: 'Tanggal Berangkat', value: selected.departure_date, done: true },
        ]
        if (selected.transit_city) {
            items.push({
                key: 'transit',
                label: `Transit — ${selected.transit_city}`,
                value: selected.transit_date,
                done: selected.status !== 'persiapan',
            })
        }
        items.push({
            key: 'destination',
            label: `Tujuan — ${selected.destination_city}, ${selected.destination_country}`,
            value: 'Estimasi tiba sesuai jadwal penerbangan',
            done: ['sedang_di_perjalanan', 'sudah_kembali'].includes(selected.status),
        })
        items.push({
            key: 'return',
            label: 'Estimasi Pulang ke Indonesia',
            value: selected.estimated_return_date,
            done: selected.status === 'sudah_kembali',
        })
        return items
    }, [selected])

    const orderUrgent = selected && ['open_po', 'checkout'].includes(selected.status)

    return (
        <>
            <Head title="Rute Perjalanan Jastip" />
            <PembeliLayout
                label="Transparansi Perjalanan"
                title="Rute Perjalanan Jastip"
                description="Pantau posisi dan jadwal perjalanan admin jastip secara real-time. Pilih trip untuk melihat rute di peta dan timeline lengkap."
                headerAction={
                    selected && (
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 12,
                            color: 'var(--muted)',
                        }}>
                            <RefreshCw size={14} />
                            Diperbarui {selected.updated_at}
                        </span>
                    )
                }
            >
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 24,
                }}>
                    {status_legend.map((item) => {
                        const s = statusStyles[item.key] ?? statusStyles.persiapan
                        return (
                            <span
                                key={item.key}
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    padding: '6px 12px',
                                    borderRadius: 2,
                                    background: s.bg,
                                    color: s.color,
                                    border: '1px solid var(--border)',
                                }}
                            >
                                {item.label}
                            </span>
                        )
                    })}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 380px)',
                    gap: 28,
                    alignItems: 'start',
                    marginBottom: 32,
                }}
                    className="rute-map-grid"
                >
                    <div>
                        <RouteMap trip={selected} height={380} />
                        {selected && (
                            <div className="pembeli-card" style={{ marginTop: 16, padding: 20 }}>
                                <p className="pembeli-label" style={{ marginBottom: 12 }}>Timeline Perjalanan</p>
                                <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                    {timeline.map((step, index) => (
                                        <li
                                            key={step.key}
                                            style={{
                                                display: 'flex',
                                                gap: 14,
                                                paddingBottom: index < timeline.length - 1 ? 20 : 0,
                                                position: 'relative',
                                            }}
                                        >
                                            {index < timeline.length - 1 && (
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 5,
                                                    top: 14,
                                                    bottom: 0,
                                                    width: 2,
                                                    background: step.done ? 'var(--primary)' : 'var(--border)',
                                                }} />
                                            )}
                                            <span style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                flexShrink: 0,
                                                marginTop: 4,
                                                background: step.done ? 'var(--primary)' : 'var(--card)',
                                                border: `2px solid ${step.done ? 'var(--primary)' : 'var(--border)'}`,
                                            }} />
                                            <div>
                                                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                                                    {step.label}
                                                </p>
                                                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                                                    {step.value}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {orderUrgent && (
                            <div style={{
                                padding: 16,
                                borderRadius: 4,
                                background: 'var(--cream)',
                                border: '1px solid rgba(212, 165, 86, 0.5)',
                            }}>
                                <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
                                    Batas akhir order
                                </p>
                                <p style={{ margin: 0, fontSize: 15, fontFamily: 'var(--font-heading)', color: 'var(--ink)' }}>
                                    {selected.order_deadline}
                                </p>
                                {selected.status === 'open_po' && (
                                    <Link
                                        href="/pembeli/belanja"
                                        className="pembeli-btn pembeli-btn-primary"
                                        style={{ marginTop: 12, width: '100%' }}
                                    >
                                        Mulai Titip Sekarang
                                    </Link>
                                )}
                            </div>
                        )}

                        <div className="pembeli-card" style={{ padding: 16 }}>
                            <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--muted)' }}>Legenda peta</p>
                            <div style={{ display: 'grid', gap: 8, fontSize: 12 }}>
                                <LegendDot color="#C05A25" label="Asal keberangkatan" />
                                <LegendDot color="#D4A556" label="Transit" />
                                <LegendDot color="#5C7A6B" label="Negara / kota tujuan" />
                            </div>
                        </div>
                    </aside>
                </div>

                <section style={{ marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <MapPin size={18} color="var(--primary)" />
                        <h2 style={{
                            margin: 0,
                            fontFamily: 'var(--font-heading)',
                            fontSize: 22,
                            fontWeight: 600,
                        }}>
                            Trip Sedang Berjalan
                        </h2>
                        <span style={{
                            fontSize: 12,
                            color: 'var(--muted)',
                            background: 'var(--cream)',
                            padding: '2px 8px',
                            borderRadius: 2,
                        }}>
                            {current_trips.length} trip
                        </span>
                    </div>
                    {current_trips.length === 0 ? (
                        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Belum ada trip aktif saat ini.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 16 }}>
                            {current_trips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    selected={selected?.id === trip.id}
                                    onSelect={setSelected}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <MapPin size={18} color="var(--gold)" />
                        <h2 style={{
                            margin: 0,
                            fontFamily: 'var(--font-heading)',
                            fontSize: 22,
                            fontWeight: 600,
                        }}>
                            Trip Berikutnya
                        </h2>
                        <span style={{
                            fontSize: 12,
                            color: 'var(--muted)',
                            background: 'var(--cream)',
                            padding: '2px 8px',
                            borderRadius: 2,
                        }}>
                            {upcoming_trips.length} trip
                        </span>
                    </div>
                    {upcoming_trips.length === 0 ? (
                        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Belum ada jadwal trip berikutnya.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 16 }}>
                            {upcoming_trips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    selected={selected?.id === trip.id}
                                    onSelect={setSelected}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <style>{`
                    @media (max-width: 900px) {
                        .rute-map-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </PembeliLayout>
        </>
    )
}

function LegendDot({ color, label }) {
    return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
            }} />
            {label}
        </span>
    )
}
