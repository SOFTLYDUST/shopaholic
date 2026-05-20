import { Head, usePage } from '@inertiajs/react'
import { Mail, MapPin, Phone, User } from 'lucide-react'
import PembeliCard from '../../components/pembeli/PembeliCard'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function Akun({ profile = {} }) {
    const { auth } = usePage().props
    const user = auth?.user

    const fields = [
        { icon: User, label: 'Nama', value: profile.name ?? user?.name },
        { icon: Mail, label: 'Email', value: profile.email ?? user?.email },
        { icon: Phone, label: 'Telepon', value: profile.phone || '—' },
        { icon: MapPin, label: 'Kota', value: profile.city || '—' },
    ]

    return (
        <>
            <Head title="Akun Saya" />
            <PembeliLayout
                label="Profil"
                title="Akun Saya"
                description="Informasi akun Anda untuk proses jasa titip dan pengiriman ke Indonesia."
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24,
                    maxWidth: 720,
                }}>
                    <PembeliCard accent>
                        <div style={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'var(--cream)',
                            border: '1px solid var(--border)',
                            display: 'grid',
                            placeItems: 'center',
                            marginBottom: 16,
                        }}>
                            <User size={28} color="var(--primary)" strokeWidth={1.5} />
                        </div>
                        <h2 style={{
                            margin: '0 0 4px',
                            fontFamily: 'var(--font-heading)',
                            fontSize: 28,
                            fontWeight: 600,
                        }}>
                            {user?.name}
                        </h2>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{user?.email}</p>
                        <span style={{
                            display: 'inline-block',
                            marginTop: 14,
                            padding: '4px 10px',
                            fontSize: 11,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            color: 'var(--primary)',
                            border: '1px solid rgba(192, 90, 37, 0.35)',
                            borderRadius: 2,
                            background: 'var(--cream)',
                        }}>
                            Pembeli
                        </span>
                    </PembeliCard>

                    <PembeliCard>
                        <p className="pembeli-label">Detail Akun</p>
                        <div style={{ marginTop: 16, display: 'grid', gap: 0 }}>
                            {fields.map((field, index) => {
                                const Icon = field.icon
                                return (
                                    <div
                                        key={field.label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 14,
                                            padding: '14px 0',
                                            borderBottom: index < fields.length - 1 ? '1px solid var(--border)' : 'none',
                                        }}
                                    >
                                        <div style={{
                                            width: 36,
                                            height: 36,
                                            display: 'grid',
                                            placeItems: 'center',
                                            background: 'rgba(192, 90, 37, 0.08)',
                                            border: '1px solid rgba(192, 90, 37, 0.2)',
                                            borderRadius: 2,
                                            flexShrink: 0,
                                        }}>
                                            <Icon size={16} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
                                                {field.label}
                                            </p>
                                            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>
                                                {field.value}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {(profile.address) && (
                            <div style={{
                                marginTop: 16,
                                padding: 14,
                                background: 'var(--cream)',
                                borderRadius: 2,
                                fontSize: 13,
                                color: 'var(--muted)',
                                lineHeight: 1.6,
                            }}>
                                <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 4 }}>Alamat tersimpan</strong>
                                {profile.address}
                                {profile.postal_code ? `, ${profile.postal_code}` : ''}
                            </div>
                        )}
                    </PembeliCard>
                </div>
            </PembeliLayout>
        </>
    )
}
