export default function PembeliCard({ children, style, padding = 24, accent = false }) {
    return (
        <div
            className="pembeli-card"
            style={{
                padding,
                ...(accent ? { borderColor: 'rgba(192, 90, 37, 0.35)' } : {}),
                ...style,
            }}
        >
            {children}
        </div>
    )
}
