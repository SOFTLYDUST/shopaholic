import { Head, router } from '@inertiajs/react'
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search,
    ShoppingBag,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import PembeliBottomNav from '../../components/pembeli/PembeliBottomNav'
import PembeliHeader from '../../components/pembeli/PembeliHeader'

const PER_PAGE = 8

const filterItems = [
    { key: 'category', label: 'Kategori' },
    { key: 'price_asc', label: 'Harga Terendah' },
    { key: 'price_desc', label: 'Harga Tertinggi' },
    { key: 'shipping', label: 'Pengiriman Terdekat' },
]

export default function HalamanBelanja({ products = [], categories = [] }) {
    const [search, setSearch] = useState('')
    const [activeFilter, setActiveFilter] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortOpen, setSortOpen] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        let list = [...products]

        if (search.trim()) {
            const q = search.toLowerCase()
            list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
        }

        if (selectedCategory) {
            list = list.filter((p) => p.category === selectedCategory)
        }

        if (activeFilter === 'price_asc') {
            list.sort((a, b) => a.price - b.price)
        } else if (activeFilter === 'price_desc') {
            list.sort((a, b) => b.price - a.price)
        } else if (activeFilter === 'shipping') {
            list.sort((a, b) => a.shipping_from.localeCompare(b.shipping_from))
        } else if (sortBy === 'price_asc') {
            list.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price_desc') {
            list.sort((a, b) => b.price - a.price)
        } else {
            list.sort((a, b) => a.name.localeCompare(b.name))
        }

        return list
    }, [products, search, selectedCategory, activeFilter, sortBy])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
    const currentPage = Math.min(page, totalPages)
    const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

    const pageNumbers = useMemo(() => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }
        const pages = [1, 2, 3]
        if (totalPages > 4) pages.push('...')
        pages.push(totalPages)
        return pages
    }, [totalPages])

    const handleFilterClick = (key) => {
        if (key === 'category') {
            setActiveFilter(activeFilter === 'category' ? null : 'category')
            return
        }
        setActiveFilter((prev) => (prev === key ? null : key))
        setSelectedCategory('')
        setPage(1)
    }

    const addToCart = (productId) => {
        router.post('/pembeli/keranjang', { product_id: productId }, { preserveScroll: true })
    }

    return (
        <>
            <Head title="Halaman Belanja" />
            <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                <PembeliHeader title="Halaman Belanja" icon={ShoppingBag} />
                <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                    <aside style={{
                        width: 'clamp(200px, 22vw, 280px)',
                        flexShrink: 0,
                        background: 'linear-gradient(180deg, #F5EFE4 0%, #E8E4F5 100%)',
                        borderRight: '1px solid #D8CFC2',
                        padding: '20px 0',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '0 20px 12px', fontFamily: '"Antic Didone", serif',
                            fontSize: 20, color: '#A62037', fontWeight: 600,
                        }}>
                            <span>FILTER</span>
                            <ChevronRight size={18} />
                        </div>
                        {filterItems.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => handleFilterClick(item.key)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '14px 20px', border: 'none', borderBottom: '1px solid rgba(140, 75, 54, 0.2)',
                                    background: activeFilter === item.key || (item.key === 'category' && selectedCategory) ? 'rgba(207, 97, 29, 0.15)' : 'transparent',
                                    fontFamily: '"Antic Didone", serif', fontSize: 17, color: '#1F1A17',
                                    cursor: 'pointer', textAlign: 'left',
                                }}
                            >
                                <span>{item.label}</span>
                                <ChevronRight size={16} color="#8C4B36" />
                            </button>
                        ))}
                        {activeFilter === 'category' && (
                            <div style={{ padding: '8px 12px 0' }}>
                                <button type="button" onClick={() => { setSelectedCategory(''); setPage(1) }} style={{
                                    display: 'block', width: '100%', marginBottom: 6, padding: '8px 12px', borderRadius: 8,
                                    border: '1px solid #8C4B36', background: !selectedCategory ? '#CF611D' : '#F4F3EE',
                                    color: !selectedCategory ? '#F8F2E8' : '#1F1A17', fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, cursor: 'pointer',
                                }}>Semua</button>
                                {categories.map((cat) => (
                                    <button key={cat} type="button" onClick={() => { setSelectedCategory(cat); setPage(1) }} style={{
                                        display: 'block', width: '100%', marginBottom: 6, padding: '8px 12px', borderRadius: 8,
                                        border: '1px solid #8C4B36', background: selectedCategory === cat ? '#CF611D' : '#F4F3EE',
                                        color: selectedCategory === cat ? '#F8F2E8' : '#1F1A17', fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, cursor: 'pointer',
                                    }}>{cat}</button>
                                ))}
                            </div>
                        )}
                    </aside>
                    <main style={{ flex: 1, background: '#F0EBC9', padding: 'clamp(16px, 2.5vw, 28px)', overflow: 'auto' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            background: '#D4DCE8', borderRadius: 16, padding: '0 16px', height: 48, maxWidth: 900,
                        }}>
                            <Search size={20} color="#5C6B7A" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                                placeholder="Cari Produk..."
                                style={{
                                    flex: 1, border: 'none', outline: 'none', background: 'transparent',
                                    fontFamily: '"Antic Didone", serif', fontSize: 18, color: '#1F1A17',
                                }}
                            />
                        </div>

                        <div style={{ marginTop: 14, position: 'relative', display: 'inline-block' }}>
                            <button type="button" onClick={() => setSortOpen((o) => !o)} style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px',
                                borderRadius: 10, border: '1px solid #8C4B36', background: '#F4F3EE',
                                fontFamily: '"Antic Didone", serif', fontSize: 16, color: '#1F1A17', cursor: 'pointer',
                            }}>
                                Urutkan <ChevronDown size={16} />
                            </button>
                            {sortOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 10,
                                    background: '#FEFBF6', border: '1px solid #8C4B36', borderRadius: 10, minWidth: 180,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                }}>
                                    {[
                                        { key: 'name', label: 'Nama A-Z' },
                                        { key: 'price_asc', label: 'Harga Terendah' },
                                        { key: 'price_desc', label: 'Harga Tertinggi' },
                                    ].map((opt) => (
                                        <button key={opt.key} type="button" onClick={() => { setSortBy(opt.key); setActiveFilter(null); setSortOpen(false); setPage(1) }} style={{
                                            display: 'block', width: '100%', padding: '10px 14px', border: 'none', background: sortBy === opt.key ? '#F5E6D8' : 'transparent',
                                            textAlign: 'left', fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 14, cursor: 'pointer',
                                        }}>{opt.label}</button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{
                            marginTop: 20,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: 20,
                        }}>
                            {paginated.map((product) => (
                                <article key={product.id} style={{
                                    background: '#E8E4F5', borderRadius: 16, padding: 16,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                }}>
                                    <div style={{
                                        width: '100%', aspectRatio: '1', borderRadius: 12, overflow: 'hidden',
                                        background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <img src={product.image} alt={product.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                                    </div>
                                    <h3 style={{
                                        margin: '12px 0 4px', fontFamily: '"Antic Didone", serif',
                                        fontSize: 'clamp(16px, 2vw, 20px)', color: '#CF611D', textAlign: 'center',
                                    }}>{product.name}</h3>
                                    <p style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 16, color: '#CF611D' }}>{product.price_formatted}</p>
                                    <button type="button" onClick={() => addToCart(product.id)} style={{
                                        marginTop: 12, width: '100%', padding: '10px 8px', borderRadius: 12,
                                        border: 'none', background: '#E8A4B8', color: '#A62037',
                                        fontFamily: '"Antic Didone", serif', fontSize: 'clamp(12px, 1.5vw, 15px)',
                                        cursor: 'pointer', lineHeight: 1.2,
                                    }}>Tambah ke Keranjang</button>
                                </article>
                            ))}
                        </div>

                        {paginated.length === 0 && (
                            <p style={{ marginTop: 24, textAlign: 'center', color: '#8C7B6B', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                                Produk tidak ditemukan.
                            </p>
                        )}

                        <nav style={{
                            marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap',
                        }}>
                            <button type="button" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} style={paginationBtnStyle(currentPage <= 1)}>
                                <ChevronLeft size={14} /> PREV
                            </button>
                            {pageNumbers.map((num, i) => (
                                typeof num === 'number' ? (
                                    <button key={num} type="button" onClick={() => setPage(num)} style={{
                                        ...paginationBtnStyle(false),
                                        background: currentPage === num ? '#E8A4B8' : '#F4F3EE',
                                        fontWeight: currentPage === num ? 700 : 400,
                                    }}>{num}</button>
                                ) : (
                                    <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: '#8C7B6B' }}>...</span>
                                )
                            ))}
                            <button type="button" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} style={paginationBtnStyle(currentPage >= totalPages)}>
                                Next <ChevronRight size={14} />
                            </button>
                        </nav>
                    </main>
                </div>
                <PembeliBottomNav active="home" />
            </div>
        </>
    )
}

function paginationBtnStyle(disabled) {
    return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 14px',
        borderRadius: 8,
        border: '1px solid #8C4B36',
        background: '#F4F3EE',
        fontFamily: '"Antic Didone", serif',
        fontSize: 14,
        color: disabled ? '#B0A090' : '#1F1A17',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
    }
}
