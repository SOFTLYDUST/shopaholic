import { Head } from '@inertiajs/react'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function Testimoni({ testimonials = [] }) {
    const ratings = [5, 4, 3, 5, 4, 3, 5, 4]

    return (
        <>
            <Head title="Testimoni" />

            <PembeliLayout
                label="TESTIMONI"
                title="Apa Kata Pelanggan?"
                description="Pengalaman pelanggan yang telah menggunakan jasa titip Shopaholic."
            >
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
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    'translateY(-8px)'
                                e.currentTarget.style.boxShadow =
                                    '0 15px 30px rgba(128,0,32,0.25)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    'translateY(0)'
                                e.currentTarget.style.boxShadow =
                                    '0 8px 20px rgba(0,0,0,0.08)'
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
                                    margin: '10px 0',
                                    color: '#800020',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                }}
                            >
                                {item.nama}
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