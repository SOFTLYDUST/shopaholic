import { Head, router } from '@inertiajs/react'
import { ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import ProductCard from '../../components/pembeli/ProductCard'
import PembeliLayout from '../../layouts/PembeliLayout'

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
    const [showFilters, setShowFilters] = useState(false)

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
            <Head title="Belanja" />
            <PembeliLayout
                label="Katalog Titip"
                title={<>Belanja Produk <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Luar Negeri</em></>}
                description="Pilih produk yang ingin dititipkan. Kami bantu beli dari luar negeri dan kirim aman ke alamat Anda di Indonesia."
            >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24, alignItems: 'center' }}>
                    <div style={{
                        flex: '1 1 260px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        padding: '0 14px',
                        height: 44,
                        background: 'var(--card)',
                    }}>
                        <Search size={18} color="var(--muted)" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                            placeholder="Cari nama atau kategori produk..."
                            style={{
                                flex: 1,
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                fontFamily: 'var(--font-body)',
                                fontSize: 14,
                                color: 'var(--ink)',
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        className="pembeli-btn pembeli-btn-ghost"
                        onClick={() => setShowFilters((o) => !o)}
                        style={{ display: 'inline-flex' }}
                    >
                        <SlidersHorizontal size={16} />
                        Filter
                    </button>

                    <div style={{ position: 'relative' }}>
                        <button
                            type="button"
                            className="pembeli-btn pembeli-btn-outline"
                            onClick={() => setSortOpen((o) => !o)}
                        >
                            Urutkan <ChevronDown size={14} />
                        </button>
                        {sortOpen && (
                            <div className="pembeli-card" style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: 6,
                                zIndex: 20,
                                minWidth: 200,
                                padding: 8,
                            }}>
                                {[
                                    { key: 'name', label: 'Nama A-Z' },
                                    { key: 'price_asc', label: 'Harga Terendah' },
                                    { key: 'price_desc', label: 'Harga Tertinggi' },
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        type="button"
                                        onClick={() => { setSortBy(opt.key); setActiveFilter(null); setSortOpen(false); setPage(1) }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: 'none',
                                            borderRadius: 2,
                                            background: sortBy === opt.key ? 'var(--cream)' : 'transparent',
                                            textAlign: 'left',
                                            fontSize: 13,
                                            color: sortBy === opt.key ? 'var(--primary)' : 'var(--ink)',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-body)',
                                        }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="belanja-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: '240px 1fr',
                    gap: 28,
                    alignItems: 'start',
                }}>
                    <FilterSidebar
                        visible={showFilters}
                        filterItems={filterItems}
                        activeFilter={activeFilter}
                        selectedCategory={selectedCategory}
                        categories={categories}
                        onFilterClick={handleFilterClick}
                        onCategorySelect={(cat) => { setSelectedCategory(cat); setPage(1) }}
                        onClearCategory={() => { setSelectedCategory(''); setPage(1) }}
                    />

                    <div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: 20,
                        }}>
                            {paginated.map((product) => (
                                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                            ))}
                        </div>

                        {paginated.length === 0 && (
                            <div className="pembeli-card" style={{ textAlign: 'center', padding: 48 }}>
                                <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
                                    Produk tidak ditemukan. Coba ubah kata kunci atau filter.
                                </p>
                            </div>
                        )}

                        {paginated.length > 0 && (
                            <nav style={{
                                marginTop: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                flexWrap: 'wrap',
                            }}>
                                <PaginationBtn disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                                    <ChevronLeft size={14} /> Sebelumnya
                                </PaginationBtn>
                                {pageNumbers.map((num, i) => (
                                    typeof num === 'number' ? (
                                        <PaginationBtn key={num} active={currentPage === num} onClick={() => setPage(num)}>
                                            {num}
                                        </PaginationBtn>
                                    ) : (
                                        <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'var(--muted)' }}>…</span>
                                    )
                                ))}
                                <PaginationBtn disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                                    Selanjutnya <ChevronRight size={14} />
                                </PaginationBtn>
                            </nav>
                        )}
                    </div>
                </div>

                <style>{`
                    @media (max-width: 900px) {
                        .belanja-layout { grid-template-columns: 1fr !important; }
                        .filter-sidebar { display: none; }
                        .filter-sidebar.is-open { display: block; }
                    }
                    @media (min-width: 901px) {
                        .filter-sidebar { display: block !important; }
                    }
                `}</style>
            </PembeliLayout>
        </>
    )
}

function FilterSidebar({
    visible,
    filterItems,
    activeFilter,
    selectedCategory,
    categories,
    onFilterClick,
    onCategorySelect,
    onClearCategory,
}) {
    return (
        <aside className={`pembeli-card filter-sidebar${visible ? ' is-open' : ''}`} style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
            }}>
                <p className="pembeli-label" style={{ margin: 0 }}>Filter Produk</p>
            </div>
            {filterItems.map((item) => (
                <button
                    key={item.key}
                    type="button"
                    onClick={() => onFilterClick(item.key)}
                    style={{
                        width: '100%',
                        display: 'block',
                        padding: '14px 20px',
                        border: 'none',
                        borderBottom: '1px solid var(--border)',
                        background: activeFilter === item.key || (item.key === 'category' && selectedCategory)
                            ? 'var(--cream)'
                            : 'transparent',
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: activeFilter === item.key ? 'var(--primary)' : 'var(--ink)',
                        fontWeight: activeFilter === item.key ? 600 : 400,
                        cursor: 'pointer',
                        textAlign: 'left',
                    }}
                >
                    {item.label}
                </button>
            ))}
            {activeFilter === 'category' && (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <CategoryChip active={!selectedCategory} onClick={onClearCategory}>Semua</CategoryChip>
                    {categories.map((cat) => (
                        <CategoryChip key={cat} active={selectedCategory === cat} onClick={() => onCategorySelect(cat)}>
                            {cat}
                        </CategoryChip>
                    ))}
                </div>
            )}
        </aside>
    )
}

function CategoryChip({ children, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                padding: '8px 12px',
                borderRadius: 2,
                border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                background: active ? 'var(--primary)' : 'var(--card)',
                color: active ? 'var(--cream)' : 'var(--ink)',
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                textAlign: 'left',
            }}
        >
            {children}
        </button>
    )
}

function PaginationBtn({ children, disabled, active, onClick }) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="pembeli-btn"
            style={{
                border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                background: active ? 'var(--cream)' : 'var(--card)',
                color: active ? 'var(--primary)' : disabled ? 'var(--muted)' : 'var(--ink)',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: 13,
                padding: '8px 14px',
                borderRadius: 2,
                fontFamily: 'var(--font-body)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
            }}
        >
            {children}
        </button>
    )
}
