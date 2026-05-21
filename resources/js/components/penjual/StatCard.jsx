export default function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="penjual-stat-card">
            <div style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: 'rgba(192, 90, 37, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <Icon size={24} color="var(--primary)" strokeWidth={1.75} />
            </div>
            <div>
                <p style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--primary)',
                    lineHeight: 1.3,
                }}>
                    {label}
                </p>
                <p style={{
                    margin: '6px 0 0',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'var(--ink)',
                }}>
                    {value}
                </p>
            </div>
        </div>
    )
}
