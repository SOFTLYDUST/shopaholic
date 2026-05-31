import { Head, router } from '@inertiajs/react'
import { ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../../components/pembeli/ProductCard'
import PembeliLayout from '../../layouts/PembeliLayout'

const PER_PAGE = 8

export default function HalamanBelanja({ products = [], categories = [] }) {

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [page, setPage] = useState(1)
    const [sortOpen, setSortOpen] = useState(false)

    // 🔥 SYNC KE BACKEND (SEARCH + CATEGORY)
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get('/pembeli/belanja', {
                search,
                category: selectedCategory,
            }, {
                preserveState: true,
                replace: true,
            })
        }, 300)

        return () => clearTimeout(delay)
    }, [search, selectedCategory])

    const sorted = useMemo(() => {
        let list = [...products]

        if (sortBy === 'price_asc') {
            list.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price_desc') {
            list.sort((a, b) => b.price - a.price)
        } else {
            list.sort((a, b) => a.name.localeCompare(b.name))
        }

        return list
    }, [products, sortBy])

    const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
    const currentPage = Math.min(page, totalPages)

    const paginated = sorted.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    )

    const addToCart = (id) => {
        router.post('/pembeli/keranjang', {
            product_id: id
        }, {
            preserveScroll: true
        })
    }

    return (
        <>
            <Head title="Belanja" />

            <PembeliLayout
                label="Katalog"
                title="Belanja Produk"
                description="Temukan produk favoritmu"
            >

                {/* SEARCH */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #ddd',
                        padding: 10,
                        borderRadius: 6
                    }}>
                        <Search size={16} />
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(1)
                            }}
                            placeholder="Cari produk..."
                            style={{
                                border: 'none',
                                outline: 'none',
                                marginLeft: 8,
                                width: '100%'
                            }}
                        />
                    </div>

                    {/* SORT */}
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setSortOpen(!sortOpen)}>
                            Urutkan <ChevronDown size={14} />
                        </button>

                        {sortOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: '#fff',
                                border: '1px solid #ddd'
                            }}>
                                <button onClick={() => setSortBy('name')}>Nama</button>
                                <button onClick={() => setSortBy('price_asc')}>Harga Terendah</button>
                                <button onClick={() => setSortBy('price_desc')}>Harga Tertinggi</button>
                            </div>
                        )}
                    </div>

                </div>

                {/* CATEGORY */}
                <div style={{ marginBottom: 20 }}>
                    <button onClick={() => setSelectedCategory('')}>Semua</button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* PRODUCT GRID */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
                    gap: 20
                }}>
                    {paginated.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>

                {/* EMPTY */}
                {paginated.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        Produk tidak ditemukan
                    </div>
                )}

                {/* PAGINATION */}
                <div style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 10
                }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    <span>{currentPage} / {totalPages}</span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>

            </PembeliLayout>
        </>
    )
}