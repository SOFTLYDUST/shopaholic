import { Head } from '@inertiajs/react'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'

const contactCards = [
    {
        icon: MapPin,
        label: 'ALAMAT',
        value: 'Jl. Bendungan Sigura-Gura V No. 17',
        note: 'Kota Malang, Jawa Timur',
    },
    {
        icon: Phone,
        label: 'TELEPON & WHATSAPP',
        value: '+62 813-9954-2183',
        note: 'Senin-Minggu, 08.00-21.00 WIB',
    },
    {
        icon: Mail,
        label: 'EMAIL',
        value: 'cs@shopaholic.com',
        note: 'Respon dalam 1x24 jam kerja',
    },
    {
        icon: MessageCircle,
        label: 'LIVE CHAT',
        value: 'Tersedia di platform',
        note: 'Support aktif 24/7 untuk pengguna terdaftar',
    },
]

export default function Kontak() {
    return (
        <MainLayout>
            <Head title="Kontak" />

            <section className="section">
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto' }}>
                    <p className="label" style={{ margin: 0 }}>HUBUNGI KAMI</p>
                    <h1 style={{ margin: '10px 0 14px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 6vw, 42px)', fontWeight: 600 }}>
                        Hubungi <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Shopaholic</em>
                    </h1>
                    <p style={{ margin: '0 0 48px', color: 'var(--muted)', fontSize: 13 }}>
                        Kami siap membantu Anda kapan saja. Jangan ragu untuk menghubungi kami melalui saluran berikut.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {contactCards.map((card) => {
                            const Icon = card.icon
                            return (
                                <article
                                    key={card.label}
                                    style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-soft)', borderRadius: 4, padding: 28, display: 'flex', gap: 18, alignItems: 'flex-start', transition: 'border-color 0.2s ease' }}
                                    onMouseEnter={(event) => { event.currentTarget.style.borderColor = 'var(--primary)' }}
                                    onMouseLeave={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
                                >
                                    <div style={{ width: 40, height: 40, background: 'rgba(192,90,37,0.1)', border: '1px solid rgba(192,90,37,0.2)', borderRadius: 2, display: 'grid', placeItems: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                                        <Icon size={18} strokeWidth={1.9} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 11, letterSpacing: 1.2 }}>{card.label}</p>
                                        <h3 style={{ margin: '8px 0 6px', fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600 }}>{card.value}</h3>
                                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12 }}>{card.note}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section" style={{ borderBottom: 'none' }}>
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto' }}>
                    <p className="label" style={{ margin: '0 0 14px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <MapPin size={14} />
                        LOKASI KAMI
                    </p>
                    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-soft)', borderRadius: 4, overflow: 'hidden', height: 360 }}>
                        <iframe
                            title="Lokasi Shopaholic"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4!2d112.6!3d-7.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJl.+Bendungan+Sigura-Gura+V+No.+17%2C+Kota+Malang!5e0!3m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
