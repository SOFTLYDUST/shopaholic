import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function Testimoni({ testimonials = [] }) {
    const ratings = [5, 4, 3, 5, 4, 3, 5, 4]

    const [form, setForm] = useState({
        nama: '',
        komentar: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        router.post('/pembeli/testimoni', form, {
            onSuccess: () => {
                setForm({
                    nama: '',
                    komentar: '',
                })
            },
        })
    }

    return (
        <>
            <Head title="Testimoni" />

            <PembeliLayout
                label="TESTIMONI"
                title="Apa Kata Pelanggan?"
                description="Pengalaman pelanggan yang telah menggunakan jasa titip Shopaholic."
            >
                {/* FORM TAMBAH TESTIMONI */}
                <div
                    style={{
                        background: '#fff',
                        padding: '28px',
                        borderRadius: '20px',
                        marginBottom: '35px',
                        border: '1px solid #d4a5a5',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                    }}
                >
                    <h2
                        style={{
                            color: '#800020',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    >
                        Tambah Testimoni
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '18px',
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Masukkan nama"
                                value={form.nama}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        nama: e.target.value,
                                    })
                                }
                                style={{
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: '1px solid #d4a5a5',
                                    outline: 'none',
                                    fontSize: '15px',
                                }}
                                required
                            />

                            <textarea
                                placeholder="Tulis testimoni..."
                                rows="4"
                                value={form.komentar}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        komentar: e.target.value,
                                    })
                                }
                                style={{
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: '1px solid #d4a5a5',
                                    outline: 'none',
                                    fontSize: '15px',
                                    resize: 'none',
                                }}
                                required
                            />

                            <button
                                type="submit"
                                style={{
                                    background:
                                        'linear-gradient(135deg,#800020,#a52a2a)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                }}
                            >
                                Kirim Testimoni
                            </button>
                        </div>
                    </form>
                </div>

                {/* LIST TESTIMONI */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {testimonials.map((item, index) => (
                        <div
                            key={item.id}
                            style={{
                                background: '#fff',
                                padding: '30px',
                                borderRadius: '20px',
                                textAlign: 'center',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                borderTop: '5px solid #800020',
                                border: '1px solid #d4a5a5',
                                transition: '0.3s',
                            }}
                        >
                            <div
                                style={{
                                    width: '65px',
                                    height: '65px',
                                    margin: '0 auto 15px',
                                    borderRadius: '50%',
                                    background:
                                        'linear-gradient(135deg, #800020, #a52a2a)',
                                    color: '#fff',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.nama.charAt(0).toUpperCase()}
                            </div>

                            <div
                                style={{
                                    fontSize: '40px',
                                    color: '#800020',
                                    lineHeight: 1,
                                }}
                            >
                                ❝
                            </div>

                            <div
                                style={{
                                    margin: '10px 0',
                                    fontSize: '18px',
                                }}
                            >
                                {'⭐'.repeat(
                                    ratings[index % ratings.length]
                                )}
                            </div>

                            <h3
                                style={{
                                    margin: '10px 0 6px',
                                    color: '#800020',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    position: 'relative',
                                    paddingBottom: '12px',
                                }}
                            >
                                {item.nama}

                                <div
                                    style={{
                                        width: '100%',
                                        height: '3px',
                                        background:
                                            'linear-gradient(90deg,#800020,#c94f7c,#800020)',
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                    }}
                                />
                            </h3>

                            <p
                                style={{
                                    color: '#555',
                                    lineHeight: '1.7',
                                    fontStyle: 'italic',
                                    margin: 0,
                                }}
                            >
                                "{item.komentar}"
                            </p>
                        </div>
                    ))}
                </div>
            </PembeliLayout>
        </>
    )
}