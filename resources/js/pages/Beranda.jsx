import { Head } from '@inertiajs/react'
import MainLayout from '../layouts/MainLayout'
import { Shield, Tag, Clock, Headphones, Rocket, Coins } from 'lucide-react'

const heroFeatures = [
    {
        icon: Shield,
        title: '100% Terpercaya',
        desc: 'Sudah melayani ribuan pelanggan dengan rekam jejak yang terbukti dan transparan.',
    },
    {
        icon: Tag,
        title: 'Harga Kompetitif',
        desc: 'Biaya jasa yang transparan dan bersaing. Tidak ada biaya tersembunyi.',
    },
    {
        icon: Clock,
        title: 'Proses Cepat',
        desc: 'Estimasi pengiriman tepat waktu dengan update status real-time di setiap tahap.',
    },
    {
        icon: Headphones,
        title: 'Support 24/7',
        desc: 'Tim customer service kami siap membantu Anda kapan saja melalui berbagai saluran.',
    },
]

const stats = [
    { value: '12K+', label: 'Pengguna Aktif' },
    { value: '98K+', label: 'Order Selesai' },
    { value: '5+', label: 'Negara' },
]

const steps = [
    { num: '01', title: 'Cari Produk', desc: 'Temukan produk yang ingin Anda beli dari toko Jastiper favorit Anda di seluruh dunia.' },
    { num: '02', title: 'Buat Pesanan', desc: 'Pilih produk yang akan kamu beli dan checkout melalui platform kami dengan mudah.' },
    { num: '03', title: 'Lakukan Pembayaran', desc: 'Bayar dengan aman melalui berbagai metode pembayaran yang tersedia di platform kami.' },
    { num: '04', title: 'Kami Belikan', desc: 'Tim kami segera membelikan produk Anda dari merchant luar negeri terpercaya.' },
    { num: '05', title: 'Proses Pengiriman', desc: 'Produk dikirim dari gudang kami ke alamat Anda di Indonesia dengan aman dan terlacak.' },
    { num: '06', title: 'Produk Tiba', desc: 'Produk impian Anda tiba dengan selamat dan dalam kondisi sempurna di tangan Anda.' },
]

const whyCards = [
    {
        icon: Shield,
        title: '100% Terpercaya',
        desc: 'Sudah melayani ribuan pelanggan dengan rekam jejak yang terbukti dan transparan.',
    },
    {
        icon: Coins,
        title: 'Harga Kompetitif',
        desc: 'Biaya jasa yang transparan dan bersaing. Tidak ada biaya tersembunyi dalam setiap transaksi.',
    },
    {
        icon: Rocket,
        title: 'Proses Cepat',
        desc: 'Estimasi pengiriman tepat waktu dengan update status real-time di setiap tahap perjalanan produk.',
    },
    {
        icon: Headphones,
        title: 'Support 24/7',
        desc: 'Tim customer service kami siap membantu Anda kapan saja melalui berbagai saluran komunikasi.',
    },
]

export default function Beranda() {
    return (
        <MainLayout>
            <Head title="Beranda" />

            <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute',
                    right: '-80px',
                    top: '-80px',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(192,90,37,0.12), transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    width: 'min(1200px, 100%)',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                    gap: '48px',
                    alignItems: 'center',
                }}>
                    <div>
                        <div className="label" style={{ marginBottom: 20 }}>
                            JASA TITIP TERPERCAYA
                        </div>
                        <h1 style={{
                            margin: 0,
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(36px, 6vw, 52px)',
                            lineHeight: 1.1,
                            fontWeight: 600,
                        }}>
                            Titip Beli Produk <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Luar Negeri</em> Kirim ke Indonesia
                        </h1>
                        <p style={{ marginTop: 18, marginBottom: 30, maxWidth: 580, color: 'var(--muted)', fontSize: 14, lineHeight: 1.8 }}>
                            Dapatkan produk impian dari luar negeri dengan mudah, aman, dan terpercaya. Kami handle semua dari pembelian hingga pengiriman ke pintu rumah Anda.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}>
                            <a className="btn btn-primary" href="/kontak">Mulai Titip Sekarang</a>
                            <a href="#cara-kerja" style={{ textDecoration: 'none', color: 'var(--muted)', fontSize: 14, transition: 'color 0.2s ease' }}>
                                Pelajari Cara Kerja →
                            </a>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                        {heroFeatures.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.title}
                                    style={{
                                        background: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        boxShadow: 'var(--shadow-soft)',
                                        padding: 20,
                                        borderRadius: 4,
                                        transition: 'border-color 0.2s ease',
                                    }}
                                    onMouseEnter={(event) => { event.currentTarget.style.borderColor = 'var(--primary)' }}
                                    onMouseLeave={(event) => { event.currentTarget.style.borderColor = 'var(--border)' }}
                                >
                                    <div style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', color: 'var(--gold)', marginBottom: 12 }}>
                                        <Icon size={18} strokeWidth={1.8} />
                                    </div>
                                    <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="section">
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 64 }}>
                    {stats.map((stat) => {
                        const valueNumber = stat.value.replace('+', '')
                        return (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 40, color: 'var(--ink)' }}>
                                    {valueNumber}
                                    <span style={{ color: 'var(--primary)' }}>+</span>
                                </p>
                                <p style={{ margin: 0, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)' }}>{stat.label}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section id="cara-kerja" className="section">
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto' }}>
                    <p className="label" style={{ margin: 0 }}>CARA KERJA</p>
                    <h2 style={{ margin: '10px 0 12px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 38px)', fontWeight: 600 }}>
                        Bagaimana Cara Kerja Jasa Titip?
                    </h2>
                    <p style={{ margin: '0 0 34px', color: 'var(--muted)', fontSize: 13 }}>Enam langkah mudah dari pemesanan hingga produk tiba di tangan Anda</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                        {steps.map((step) => (
                            <div
                                key={step.num}
                                style={{
                                    position: 'relative',
                                    minHeight: 170,
                                    border: '1px solid var(--border)',
                                    borderRadius: 4,
                                    background: 'var(--card)',
                                    boxShadow: 'var(--shadow-soft)',
                                    padding: 24,
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                                }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = 'translateY(-6px)'
                                    event.currentTarget.style.boxShadow = '0 12px 24px rgba(28, 25, 22, 0.14)'
                                    event.currentTarget.style.borderColor = 'var(--primary)'
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = 'translateY(0)'
                                    event.currentTarget.style.boxShadow = 'var(--shadow-soft)'
                                    event.currentTarget.style.borderColor = 'var(--border)'
                                }}
                            >
                                <p style={{ position: 'absolute', margin: 0, right: 16, top: 6, fontFamily: 'var(--font-heading)', fontSize: 64, opacity: 0.08 }}>{step.num}</p>
                                <p style={{ margin: 0, color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>{step.title}</p>
                                <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ borderBottom: 'none' }}>
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto' }}>
                    <p className="label" style={{ margin: 0 }}>KEUNGGULAN KAMI</p>
                    <h2 style={{ margin: '10px 0 12px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 38px)', fontWeight: 600 }}>
                        Mengapa Jasa Titip di Shopaholic?
                    </h2>
                    <p style={{ margin: '0 0 34px', color: 'var(--muted)', fontSize: 13 }}>Layanan terbaik dengan kepercayaan jutaan pengguna di seluruh Indonesia</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                        {whyCards.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.title}
                                    style={{
                                        background: 'var(--card)',
                                        border: '1px solid var(--border)',
                                        boxShadow: 'var(--shadow-soft)',
                                        borderRadius: 4,
                                        padding: 28,
                                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.transform = 'translateY(-4px)'
                                        event.currentTarget.style.borderColor = 'var(--primary)'
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.transform = 'translateY(0)'
                                        event.currentTarget.style.borderColor = 'var(--border)'
                                    }}
                                >
                                    <div style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', background: 'rgba(192,90,37,0.1)', border: '1px solid rgba(192,90,37,0.25)', borderRadius: 2, color: 'var(--primary)' }}>
                                        <Icon size={18} strokeWidth={1.9} />
                                    </div>
                                    <h3 style={{ margin: '14px 0 8px', fontFamily: 'var(--font-heading)', fontSize: 22 }}>{item.title}</h3>
                                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
