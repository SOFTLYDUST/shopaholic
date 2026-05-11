import { Head, Link } from '@inertiajs/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Daftar() {
    const [role, setRole] = useState('pembeli')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const isPembeli = role === 'pembeli'

    return (
        <>
            <Head title="Daftar" />
            <div
                style={{
                    minHeight: '100dvh',
                    background: '#A62037',
                    padding: 'clamp(10px, 1.8vh, 18px) 14px',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                }}
            >
                <div style={{ textAlign: 'center', color: '#F7F2DE' }}>
                    <h1
                        style={{
                            margin: 0,
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(26px, 3.6vw, 42px)',
                            fontWeight: 700,
                            letterSpacing: 0.4,
                        }}
                    >
                        DAFTAR AKUN BARU
                    </h1>
                    <p
                        style={{
                            margin: '4px 0 0',
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(16px, 2.4vw, 28px)',
                            fontWeight: 400,
                        }}
                    >
                        Bergabunglah dengan Shopaholic sekarang!
                    </p>
                </div>

                <div
                    style={{
                        width: 'min(980px, 100%)',
                        margin: 'clamp(10px, 1.8vh, 18px) auto 0',
                        background: '#F0EBC9',
                        borderRadius: 24,
                        padding: '18px clamp(14px, 2vw, 26px) 14px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            color: '#1F1A17',
                        }}
                    >
                        Masuk Sebagai
                    </p>

                    <div style={{ display: 'flex', gap: 12, marginTop: 8, maxWidth: 420 }}>
                        <button
                            type="button"
                            onClick={() => setRole('pembeli')}
                            style={{
                                width: 140,
                                height: 34,
                                borderRadius: 10,
                                border: '1px solid #8C4B36',
                                background: isPembeli ? '#CF611D' : '#F4F3EE',
                                color: isPembeli ? '#F8F2E8' : '#B46D49',
                                fontFamily: '"Antic Didone", serif',
                                fontSize: 'clamp(16px, 1.9vw, 22px)',
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
                                width: 140,
                                height: 34,
                                borderRadius: 10,
                                border: '1px solid #8C4B36',
                                background: !isPembeli ? '#CF611D' : '#F4F3EE',
                                color: !isPembeli ? '#F8F2E8' : '#B46D49',
                                fontFamily: '"Antic Didone", serif',
                                fontSize: 'clamp(16px, 1.9vw, 22px)',
                                lineHeight: 1,
                                cursor: 'pointer',
                            }}
                        >
                            Penjual
                        </button>
                    </div>

                    <div
                        style={{
                            marginTop: 14,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                            columnGap: 24,
                            rowGap: 8,
                        }}
                    >
                        <Field label="Username" placeholder="Minimal 4 karakter" />
                        <Field label="Email" type="email" placeholder="email@example.com" />
                        <Field label="Nama Lengkap" placeholder="Masukkan nama lengkap" />
                        <Field label="No Telepon" placeholder="Contoh: 081399542183" />

                        <Field
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Minimal 8 Karakter"
                            hasToggle
                            onToggle={() => setShowPassword((prev) => !prev)}
                            isVisible={showPassword}
                        />
                        <Field
                            label="Konfirmasi Password"
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            placeholder="Ulangi password"
                            hasToggle
                            onToggle={() => setShowPasswordConfirmation((prev) => !prev)}
                            isVisible={showPasswordConfirmation}
                        />
                    </div>

                    <button
                        type="button"
                        style={{
                            display: 'block',
                            margin: '16px auto 0',
                            width: 'min(230px, 100%)',
                            height: 40,
                            border: 'none',
                            borderRadius: 14,
                            background: '#A62037',
                            color: '#F7F2DE',
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(16px, 2vw, 24px)',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                        }}
                    >
                        Daftar Sekarang
                    </button>

                    <p
                        style={{
                            margin: '8px 0 0',
                            textAlign: 'center',
                            color: '#8E8E8E',
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(12px, 1.4vw, 14px)',
                        }}
                    >
                        Sudah punya akun?{' '}
                        <Link href="/masuk" style={{ color: '#A62037', textDecoration: 'none' }}>
                            Masuk Disini
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

function Field({ label, type = 'text', placeholder, hasToggle = false, onToggle, isVisible = false }) {
    return (
        <label style={{ display: 'grid', gap: 4 }}>
            <span
                style={{
                    fontFamily: '"Antic Didone", serif',
                    fontSize: 'clamp(14px, 1.8vw, 20px)',
                    color: '#1F1A17',
                }}
            >
                {label}
            </span>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 44,
                    borderRadius: 12,
                    border: '1px solid #8C4B36',
                    background: '#F4F3EE',
                    padding: '0 14px',
                }}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        background: 'transparent',
                        fontFamily: '"Antic Didone", serif',
                        fontSize: 'clamp(13px, 1.4vw, 17px)',
                        lineHeight: 1,
                        color: '#1F1A17',
                    }}
                />
                {hasToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            padding: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        aria-label={isVisible ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                        {isVisible ? <EyeOff size={18} color="#787878" /> : <Eye size={18} color="#787878" />}
                    </button>
                )}
            </span>
        </label>
    )
}
