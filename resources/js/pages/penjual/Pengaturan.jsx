import { Head, useForm, usePage } from '@inertiajs/react'
import PenjualLayout from '../../layouts/PenjualLayout'

export default function Pengaturan({ profile }) {
    const { flash } = usePage().props
    const { data, setData, patch, processing, errors } = useForm({
        name: profile.name ?? '',
        phone: profile.phone ?? '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        patch('/penjual/pengaturan')
    }

    return (
        <>
            <Head title="Pengaturan" />
            <PenjualLayout pageTitle="Pengaturan">
                <div style={{ maxWidth: 480 }}>
                    {flash?.success && (
                        <p style={{
                            margin: '0 0 16px',
                            padding: '10px 14px',
                            background: 'rgba(45, 106, 79, 0.1)',
                            color: '#2D6A4F',
                            fontSize: 13,
                            borderRadius: 4,
                        }}>
                            {flash.success}
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="pembeli-card" style={{ padding: 24 }}>
                        <p className="pembeli-label">Profil Penjual</p>
                        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Nama</span>
                                <input
                                    type="text"
                                    className="pembeli-input"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <span style={{ fontSize: 12, color: '#9A3B2F' }}>{errors.name}</span>}
                            </label>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Email</span>
                                <input
                                    type="email"
                                    className="pembeli-input"
                                    value={profile.email}
                                    disabled
                                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                />
                            </label>
                            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Telepon</span>
                                <input
                                    type="text"
                                    className="pembeli-input"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="08xxxxxxxxxx"
                                />
                                {errors.phone && <span style={{ fontSize: 12, color: '#9A3B2F' }}>{errors.phone}</span>}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="pembeli-btn pembeli-btn-primary"
                            disabled={processing}
                            style={{ marginTop: 24 }}
                        >
                            Simpan Perubahan
                        </button>
                    </form>
                </div>
            </PenjualLayout>
        </>
    )
}
