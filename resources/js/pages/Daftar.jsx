import { Head, Link, useForm } from '@inertiajs/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function Daftar() {
    const [role, setRole] = useState('pembeli')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'pembeli',
    })

    const isPembeli = role === 'pembeli'

    const handleRoleChange = (newRole) => {
        setRole(newRole)
        setData('role', newRole)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/daftar')
    }

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

                <form
                    onSubmit={handleSubmit}
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
                            onClick={() => handleRoleChange('pembeli')}
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
                            onClick={() => handleRoleChange('penjual')}
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
                        <Field
                            label="Email"
                            type="email"
                            placeholder="email@gmail.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            required
                        />
                        <Field
                            label="Nama Lengkap"
                            placeholder="Masukkan nama lengkap"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />
                        <Field
                            label="No Telepon"
                            placeholder="Contoh: 081399542183"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            error={errors.phone}
                        />
                        <Field
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Minimal 8 Karakter"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            hasToggle
                            onToggle={() => setShowPassword((prev) => !prev)}
                            isVisible={showPassword}
                            required
                        />
                        <Field
                            label="Konfirmasi Password"
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            placeholder="Ulangi password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            hasToggle
                            onToggle={() => setShowPasswordConfirmation((prev) => !prev)}
                            isVisible={showPasswordConfirmation}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            display: 'block',
                            margin: '16px auto 0',
                            width: 'min(230px, 100%)',
                            height: 40,
                            border: 'none',
                            borderRadius: 14,
                            background: processing ? '#8a1a2c' : '#A62037',
                            color: '#F7F2DE',
                            fontFamily: '"Antic Didone", serif',
                            fontSize: 'clamp(16px, 2vw, 24px)',
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            cursor: processing ? 'not-allowed' : 'pointer',
                            opacity: processing ? 0.8 : 1,
                        }}
                    >
                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
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
                </form>
            </div>
        </>
    )
}

function Field({ label, type = 'text', placeholder, value, onChange, error, hasToggle = false, onToggle, isVisible = false, required = false }) {
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
                    border: `1px solid ${error ? '#A62037' : '#8C4B36'}`,
                    background: '#F4F3EE',
                    padding: '0 14px',
                }}
            >
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
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
            {error && (
                <span style={{ color: '#A62037', fontSize: 12, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    {error}
                </span>
            )}
        </label>
    )
}
