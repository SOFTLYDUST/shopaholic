import { Head } from '@inertiajs/react'
import PenjualLayout from '../../layouts/PenjualLayout'

export default function Pesanan({ orders = [] }) {
    return (
        <>
            <Head title="Pesanan" />
            <PenjualLayout pageTitle="Pesanan">
                <div className="pembeli-card" style={{ overflow: 'hidden' }}>
                    {orders.length === 0 ? (
                        <p style={{ margin: 0, padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                            Belum ada pesanan.
                        </p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                    <tr style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
                                        {['Nomor', 'Pelanggan', 'Total', 'Status', 'Tanggal'].map((h) => (
                                            <th
                                                key={h}
                                                style={{
                                                    textAlign: 'left',
                                                    padding: '12px 16px',
                                                    fontWeight: 600,
                                                    color: 'var(--primary)',
                                                    fontSize: 11,
                                                    letterSpacing: 1,
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--primary)' }}>
                                                {order.order_number}
                                            </td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <div>{order.customer}</div>
                                                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{order.email}</div>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontWeight: 600 }}>{order.total_formatted}</td>
                                            <td style={{ padding: '14px 16px' }}>
                                                <span style={{
                                                    fontSize: 11,
                                                    padding: '4px 10px',
                                                    background: 'rgba(192, 90, 37, 0.1)',
                                                    color: 'var(--primary)',
                                                    borderRadius: 2,
                                                    fontWeight: 600,
                                                }}>
                                                    {order.tracking_status_label}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{order.ordered_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </PenjualLayout>
        </>
    )
}
