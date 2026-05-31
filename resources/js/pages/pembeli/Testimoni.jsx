import { Head } from '@inertiajs/react'
import PembeliLayout from '../../layouts/PembeliLayout'

export default function Testimoni() {
    const testimonials = [
        {
            id: 1,
            nama: 'Alya',
            komentar: 'Barang sampai dengan aman dan sesuai pesanan.'
        },
        {
            id: 2,
            nama: 'Rina',
            komentar: 'Pelayanan cepat dan responsif.'
        },
        {
            id: 3,
            nama: 'Dinda',
            komentar: 'Sangat puas menggunakan jasa titip Shopaholic.'
        }
    ]

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
                        gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
                        gap: 20
                    }}
                >
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="pembeli-card"
                            style={{ padding: 24 }}
                        >
                            <h3>{item.nama}</h3>
                            <p>"{item.komentar}"</p>
                        </div>
                    ))}
                </div>
            </PembeliLayout>
        </>
    )
}