import { Head } from '@inertiajs/react'
import { ClipboardCheck, Package, Users, Wallet } from 'lucide-react'
import StatCard from '../../components/penjual/StatCard'
import PenjualLayout from '../../layouts/PenjualLayout'

export default function Dashboard({ stats, recent_orders = [] }) {
    return (
        <>
            <Head title="Dashboard Penjual" />
            <PenjualLayout pageTitle="Dashboard Penjual">
                <div className="penjual-dashboard-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(260px, 320px) 1fr',
                    gap: 24,
                    alignItems: 'start',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <StatCard
                            icon={ClipboardCheck}
                            label="Total Pesanan"
                            value={stats.total_orders}
                        />
                        <StatCard
                            icon={Package}
                            label="Produk Aktif"
                            value={stats.active_products}
                        />
                        <StatCard
                            icon={Wallet}
                            label="Total Pendapatan"
                            value={stats.total_revenue}
                        />
                        <StatCard
                            icon={Users}
                            label="Total Pelanggan"
                            value={stats.total_customers}
                        />
                    </div>

                    <div style={{
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-soft)',
                        background: 'var(--card)',
                        minHeight: 420,
                    }}>
                        <div style={{
                            padding: '14px 20px',
                            background: 'linear-gradient(90deg, rgba(192, 90, 37, 0.15) 0%, rgba(212, 165, 86, 0.2) 100%)',
                            borderBottom: '1px solid var(--border)',
                        }}>
                            <h2 style={{
                                margin: 0,
                                fontFamily: 'var(--font-heading)',
                                fontSize: 18,
                                fontWeight: 600,
                                color: 'var(--primary)',
                            }}>
                                Pesanan Terbaru
                            </h2>
                        </div>
                        <div style={{
                            padding: 20,
                            minHeight: 360,
                            background: 'linear-gradient(180deg, #EDE8F2 0%, #E8F0F4 40%, var(--cream) 100%)',
                        }}>
                            {recent_orders.length === 0 ? (
                                <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)', textAlign: 'center', paddingTop: 80 }}>
                                    Belum ada pesanan masuk.
                                </p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {recent_orders.map((order) => (
                                        <div
                                            key={order.order_number}
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr auto auto',
                                                gap: 12,
                                                alignItems: 'center',
                                                padding: '12px 14px',
                                                background: 'rgba(254, 251, 246, 0.85)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 4,
                                                fontSize: 13,
                                            }}
                                        >
                                            <div>
                                                <strong style={{ color: 'var(--primary)' }}>{order.order_number}</strong>
                                                <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: 12 }}>
                                                    {order.customer} · {order.ordered_at}
                                                </p>
                                            </div>
                                            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{order.total_formatted}</span>
                                            <span style={{
                                                fontSize: 11,
                                                padding: '4px 8px',
                                                borderRadius: 2,
                                                background: 'rgba(192, 90, 37, 0.1)',
                                                color: 'var(--primary)',
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {order.status_label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 900px) {
                        .penjual-dashboard-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </PenjualLayout>
        </>
    )
}
