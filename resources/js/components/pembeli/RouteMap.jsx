import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const markerColors = {
    origin: '#C05A25',
    transit: '#D4A556',
    destination: '#5C7A6B',
}

function createIcon(color) {
    return L.divIcon({
        className: '',
        html: `<span style="
            display:block;width:14px;height:14px;border-radius:50%;
            background:${color};border:2px solid #FEFBF6;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
        "></span>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
    })
}

export default function RouteMap({ trip, height = 360 }) {
    const containerRef = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !trip?.route_points?.length) return

        if (mapRef.current) {
            mapRef.current.remove()
            mapRef.current = null
        }

        const map = L.map(containerRef.current, {
            scrollWheelZoom: true,
            zoomControl: true,
        })
        mapRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18,
        }).addTo(map)

        const latLngs = trip.route_points.map((p) => [p.lat, p.lng])

        trip.route_points.forEach((point) => {
            L.marker([point.lat, point.lng], {
                icon: createIcon(markerColors[point.type] ?? markerColors.origin),
            })
                .addTo(map)
                .bindPopup(`<strong>${point.label}</strong>`)
        })

        if (latLngs.length > 1) {
            L.polyline(latLngs, {
                color: '#C05A25',
                weight: 3,
                opacity: 0.75,
                dashArray: '8 10',
            }).addTo(map)
        }

        const bounds = L.latLngBounds(latLngs)
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 5 })

        return () => {
            map.remove()
            mapRef.current = null
        }
    }, [trip])

    if (!trip) {
        return (
            <div
                className="pembeli-card"
                style={{
                    height,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--muted)',
                    fontSize: 14,
                }}
            >
                Pilih trip untuk melihat rute di peta
            </div>
        )
    }

    return (
        <div
            className="pembeli-card"
            style={{ padding: 0, overflow: 'hidden' }}
        >
            <div
                ref={containerRef}
                style={{ height, width: '100%', zIndex: 0 }}
                aria-label={`Peta rute ${trip.title}`}
            />
        </div>
    )
}
