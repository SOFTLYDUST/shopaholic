import { Head, Link } from '@inertiajs/react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useState } from 'react'

export default function Masuk() {
    const [role, setRole] = useState('pembeli')
    const [showPassword, setShowPassword] = useState(false)

    const isPembeli = role === 'pembeli'

    return (
        <>
            <Head title="Masuk" />
            <div style={{
                minHeight: '100dvh',
                background: '#A62037',
                padding: 'clamp(16px, 2.5vh, 28px) 16px',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}>
                <div style={{ textAlign: 'center', color: '#F7F2DE' }}>
                    <h1 style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 400, letterSpacing: 0.6 }}>
                        SELAMAT DATANG!
                    </h1>
                    <p style={{ margin: '6px 0 0', fontFamily: '"Antic Didone", serif', fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 400 }}>
                        Silahkan Login ke Akun Anda
                    </p>
                </div>

                <div style={{
                    width: 'min(550px, 100%)',
                    margin: 'clamp(14px, 2vh, 24px) auto 0',
                    background: '#F0EBC9',
                    borderRadius: 22,
                    padding: '26px 20px 22px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                }}>
                    <p style={{ margin: 0, fontFamily: '"Antic Didone", serif', fontSize: 'clamp(24px, 3.6vw, 34px)', color: '#1F1A17' }}>
                        Masuk Sebagai
                    </p>

                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                        <button
                            type="button"
                            onClick={() => setRole('pembeli')}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                height: 40,
                                borderRadius: 10,
                                border: '1px solid #8C4B36',
                                background: isPembeli ? '#CF611D' : '#F4F3EE',
                                color: isPembeli ? '#F8F2E8' : '#B46D49',
                                fontFamily: '"Antic Didone", serif',
                                fontSize: 'clamp(18px, 3.2vw, 28px)',
                                lineHeight: 1,
                                cursor: 'pointer',
                            }}
                        >
                            Pembeli
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('penjual')}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                height: 40,
                                borderRadius: 10,
                                border: '1px solid #8C4B36',
                                background: !isPembeli ? '#CF611D' : '#F4F3EE',
                                color: !isPembeli ? '#F8F2E8' : '#B46D49',
                                fontFamily: '"Antic Didone", serif',
                                fontSize: 'clamp(18px, 3.2vw, 28px)',
                                lineHeight: 1,
                                cursor: 'pointer',
                            }}
                        >
                            Penjual
                        </button>
                    </div>

                    <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            height: 48,
                            borderRadius: 14,
                            border: '1px solid #8C4B36',
                            background: '#F4F3EE',
                            padding: '0 16px',
                        }}>
                            <User size={18} color="#1F1A17" />
                            <input
                                type="text"
                                placeholder="Username"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    width: '100%',
                                    background: 'transparent',
                                    fontFamily: '"Antic Didone", serif',
                                    fontSize: 'clamp(16px, 2.4vw, 22px)',
                                    lineHeight: 1,
                                    color: '#1F1A17',
                                }}
                            />
                        </label>

                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            height: 48,
                            borderRadius: 14,
                            border: '1px solid #8C4B36',
                            background: '#F4F3EE',
                            padding: '0 16px',
                        }}>
                            <Lock size={18} color="#1F1A17" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    width: '100%',
                                    background: 'transparent',
                                    fontFamily: '"Antic Didone", serif',
                                    fontSize: 'clamp(16px, 2.4vw, 22px)',
                                    lineHeight: 1,
                                    color: '#1F1A17',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    padding: 0,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                            >
                                {showPassword ? <EyeOff size={20} color="#787878" /> : <Eye size={20} color="#787878" />}
                            </button>
                        </label>
                    </div>

                    <button
                        type="button"
                        style={{
                            display: 'block',
                            margin: '20px auto 0',
                            width: 'min(290px, 100%)',
                            height: 44,
                            border: 'none',
                            borderRadius: 12,
                            background: '#A62037',
                            color: '#F7F2DE',
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(18px, 3.4vw, 28px)',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                        }}
                    >
                        Masuk Sekarang
                    </button>

                    <p style={{
                        margin: '14px 0 0',
                        textAlign: 'center',
                        color: '#8E8E8E',
                        fontFamily: '"Antic Didone", serif',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                    }}>
                        Belum punya akun?{' '}
                        <Link href="/daftar" style={{ color: '#A62037', textDecoration: 'none' }}>
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
