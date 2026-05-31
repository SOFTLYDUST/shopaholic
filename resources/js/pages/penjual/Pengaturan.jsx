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
                {flash?.success && (
                    <div
                        style={{
                            marginBottom: '20px',
                            padding: '14px 18px',
                            background: '#EAF8F0',
                            color: '#2D6A4F',
                            borderRadius: '12px',
                            fontWeight: 500,
                        }}
                    >
                        {flash.success}
                    </div>
                )}

                <form
    onSubmit={handleSubmit}
    className="pembeli-card"
    style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        boxSizing: 'border-box',
    }}
>
                    <h2
    style={{
        marginTop: 0,
        marginBottom: '35px',
        color: '#A02436',
        fontSize: '30px',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        letterSpacing: '0.5px',
        lineHeight: 1.2,
    }}
>
    Profil Penjual
</h2>

                    <div
    style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '50px',
        rowGap: '40px',
    }}
>
                        <label
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 600,
                                    color: 'var(--muted)',
                                }}
                            >
                                Nama
                            </span>

                            <input
                                type="text"
                                className="pembeli-input"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />

                            {errors.name && (
                                <span
                                    style={{
                                        color: '#9A3B2F',
                                        fontSize: '12px',
                                    }}
                                >
                                    {errors.name}
                                </span>
                            )}
                        </label>

                        <label
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 600,
                                    color: 'var(--muted)',
                                }}
                            >
                                Email
                            </span>

                            <input
                                type="email"
                                className="pembeli-input"
                                value={profile.email}
                                disabled
                                style={{
                                    opacity: 0.7,
                                    cursor: 'not-allowed',
                                }}
                            />
                        </label>

                        <label
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                gridColumn: 'span 2',
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: 600,
                                    color: 'var(--muted)',
                                }}
                            >
                                Nomor Telepon
                            </span>

                            <input
                                type="text"
                                className="pembeli-input"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                placeholder="08xxxxxxxxxx"
                            />

                            {errors.phone && (
                                <span
                                    style={{
                                        color: '#9A3B2F',
                                        fontSize: '12px',
                                    }}
                                >
                                    {errors.phone}
                                </span>
                            )}
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="pembeli-btn pembeli-btn-primary"
                        disabled={processing}
                        style={{
                            marginTop: '32px',
                            minWidth: '220px',
                            height: '50px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        {processing
                            ? 'Menyimpan...'
                            : 'Simpan Perubahan'}
                    </button>
                </form>
            </PenjualLayout>
        </>
    )
}