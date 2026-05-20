import { Calendar, Clock, MapPin, Plane } from 'lucide-react'

const statusStyles = {
    persiapan: { bg: '#E8E4DF', color: '#5C5348', border: '#D8CFC2' },
    open_po: { bg: '#E8F0EC', color: '#2D6A4F', border: '#95C9A8' },
    checkout: { bg: '#F5EFE4', color: '#9A6B2F', border: '#D4A556' },
    sedang_di_perjalanan: { bg: '#FCEEE6', color: '#A84E21', border: '#E8B49A' },
    sudah_kembali: { bg: '#F0F0EE', color: '#8C7B6B', border: '#D8CFC2' },
}

export default function TripCard({ trip, selected, onSelect }) {
    const style = statusStyles[trip.status] ?? statusStyles.persiapan

    return (
        <button
            type="button"
            onClick={() => onSelect(trip)}
            className="pembeli-card"
            style={{
                width: '100%',
                textAlign: 'left',
                padding: 20,
                cursor: 'pointer',
                border: selected ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selected ? 'var(--cream)' : 'var(--card)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: selected ? '0 8px 24px rgba(192, 90, 37, 0.12)' : 'var(--shadow-soft)',
            }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
                <h3 style={{
                    margin: 0,
                    fontFamily: 'var(--font-heading)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--ink)',
                }}>
                    {trip.title}
                </h3>
                <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 2,
                    background: style.bg,
                    color: style.color,
                    border: `1px solid ${style.border}`,
                }}>
                    {trip.status_label}
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14, color: 'var(--ink)' }}>
                <MapPin size={15} color="var(--primary)" />
                <span>
                    <strong>{trip.origin_city}</strong>, {trip.origin_country}
                    <span style={{ margin: '0 8px', color: 'var(--muted)' }}>→</span>
                    <strong>{trip.destination_city}</strong>, {trip.destination_country}
                </span>
            </div>

            <div style={{ display: 'grid', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Plane size={13} />
                    Berangkat: {trip.departure_date}
                    {trip.transit_city && ` · Transit ${trip.transit_city} (${trip.transit_date})`}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={13} />
                    Estimasi pulang: {trip.estimated_return_date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={13} />
                    Batas order: {trip.order_deadline}
                </span>
            </div>

            {trip.titip_estimation && (
                <p style={{
                    margin: '12px 0 0',
                    padding: '10px 12px',
                    background: 'var(--cream)',
                    borderRadius: 2,
                    fontSize: 12,
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                }}>
                    {trip.titip_estimation}
                </p>
            )}
        </button>
    )
}
