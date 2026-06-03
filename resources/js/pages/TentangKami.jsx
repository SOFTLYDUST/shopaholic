import { Head } from '@inertiajs/react'
import MainLayout from '../layouts/MainLayout'

const logoPath = '/img/Logo%20Shopaholic%203.png'

const missions = [
    'Memudahkan pengguna dalam memesan produk luar negeri dengan proses yang cepat, praktis, dan mudah dipahami.',
    'Menjamin keaslian dan kualitas setiap produk melalui pembelian dari sumber terpercaya.',
    'Memberikan transparansi harga secara jelas tanpa biaya tersembunyi agar pengguna merasa aman dan nyaman.',
    'Menyediakan layanan pengiriman yang aman, cepat, dan tepat waktu hingga produk sampai ke tangan pelanggan.',
]

const leftPhilosophy = [
    {
        title: 'Nama Shopaholic',
        body: "Secara harfiah, 'shopaholic' bermakna obsesi atau kecintaan yang berlebihan terhadap aktivitas berbelanja. Dalam strategi branding ini, konotasi tersebut diputarbalikkan menjadi sebuah keunggulan bisnis. Kami mengambil semangat, kegigihan, dan sikap pantang menyerah dalam berburu barang impian, lalu menjadikannya sebagai standar pelayanan personal shopper yang berdedikasi tinggi demi kepuasan klien.",
    },
    {
        title: 'Bingkai Oval',
        body: 'Bingkai oval dalam psikologi melambangkan perlindungan, kontinuitas, dan keutuhan. Bingkai yang mengelilingi nama brand ini merepresentasikan komitmen serta garansi keamanan dari kami untuk menjaga keutuhan barang sejak proses pembelian hingga tiba dengan selamat di tangan konsumen.',
    },
]

const rightPhilosophy = [
    {
        title: 'Font Shopaholic',
        body: "Font 'Shopaholic' dipilih karena menyimbolkan personal touch. Jenis huruf ini mengaskan bahwa layanan ini dijalankan melalui interaksi manusia yang luwes, ramah, dan sangat menyesuaikan dengan kebutuhan spesifik setiap pelanggan, bukan sistem yang kaku.",
    },
    {
        title: 'Ornamen Pita',
        body: 'Ornamen pita (ribbon) merupakan simbol universal untuk hospitality atau keramahtamahan, serta excellent service. Elemen ini merepresentasikan komitmen brand dalam memberikan pelayanan yang hangat, profesional, dan berorientasi pada kepuasan pelanggan. Pita juga memberi kesan perhatian khusus dan sentuhan personal, sehingga memperkuat citra layanan yang premium dan terpercaya.',
    },
]

export default function TentangKami() {
    return (
        <MainLayout>
            <Head title="Tentang Kami" />

            <section className="section">
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 34, alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 6vw, 42px)', lineHeight: 1.1, fontWeight: 600 }}>
                            Mengenal Lebih Dekat <br />
                            <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Shopaholic</em>
                        </h1>
                        <div style={{ width: 40, height: 2, margin: '20px 0', background: 'var(--primary)' }} />
                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.9 }}>
                            Shopaholic adalah platform jasa titip yang membantu masyarakat Indonesia membeli produk dari luar negeri dengan mudah, aman, dan terpercaya. Melalui layanan ini, pengguna dapat memesan berbagai barang dari berbagai negara tanpa harus bepergian, dengan proses yang praktis, harga transparan, serta jaminan keaslian produk dan pengiriman yang tepat waktu.
                        </p>
                    </div>

                    <div style={{ background: 'var(--card)', padding: 48, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 360, height: 360, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
    src={logoPath}
    alt="Logo Shopaholic"
    style={{
        width: '100%',
        maxWidth: '280px',
        height: 'auto',
        display: 'block',
    }}
/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 30, alignItems: 'start' }}>
                    <div style={{ background: 'var(--card)', boxShadow: 'var(--shadow-soft)', borderRadius: 4, padding: 40 }}>
                        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}>
                            Visi &amp; Misi <br />
                            <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Shopaholic</em>
                        </h2>
                        <p style={{ margin: '16px 0 0', color: 'var(--muted)', fontSize: 13, lineHeight: 1.8 }}>
                            Shopaholic memiliki visi menjadi platform jasa titip terpercaya yang memudahkan masyarakat Indonesia memperoleh produk luar negeri secara aman, transparan, dan efisien. Untuk mewujudkannya, Shopaholic menjalankan misi dengan menyediakan layanan pemesanan yang cepat dan mudah digunakan serta memberikan layanan pelanggan yang responsif dan profesional.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gap: 16 }}>
                        {missions.map((item, index) => (
                            <div key={item} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ width: 28, height: 28, background: 'var(--primary)', color: 'var(--cream)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                                    {index + 1}
                                </div>
                                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ borderBottom: 'none' }}>
                <div style={{ width: 'min(1200px, 100%)', margin: '0 auto' }}>
                    <p className="label" style={{ margin: 0, textAlign: 'center' }}>IDENTITAS BRAND</p>
                    <h2 style={{ margin: '10px 0 32px', textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 5vw, 38px)', fontWeight: 600, lineHeight: 1.15 }}>
                        Filosofi Logo <br />
                        <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Shopaholic</em>
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'start', gap: 16 }}>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {leftPhilosophy.map((item) => (
                                <article key={item.title} style={{ background: 'var(--card)', boxShadow: 'var(--shadow-soft)', padding: 28, borderRadius: 4 }}>
                                    <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{item.body}</p>
                                </article>
                            ))}
                        </div>

                        <div style={{ background: 'var(--card)', borderRadius: 4, padding: 20, minHeight: 370, display: 'grid', placeItems: 'center', justifySelf: 'center', alignSelf: 'center', transform: 'translateX(-5px)' }}>
                            <div style={{ width: 360, height: 360, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={logoPath}
                                    alt="Logo Shopaholic"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            {rightPhilosophy.map((item) => (
                                <article key={item.title} style={{ background: 'var(--card)', boxShadow: 'var(--shadow-soft)', padding: 28, borderRadius: 4 }}>
                                    <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>{item.body}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
