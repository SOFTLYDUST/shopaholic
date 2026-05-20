export const theme = {
    bg: '#FEFBF6',
    card: '#FEFBF6',
    cream: '#F5EFE4',
    border: '#D8CFC2',
    primary: '#C05A25',
    primaryHover: '#a84e21',
    gold: '#D4A556',
    ink: '#1C1916',
    muted: '#8C7B6B',
    shadow: '0 6px 18px rgba(28, 25, 22, 0.08)',
    fontHeading: '"Antic Didone", serif',
    fontBody: '"Plus Jakarta Sans", sans-serif',
}

export const themeCss = `
    :root {
        --bg: ${theme.bg};
        --card: ${theme.card};
        --cream: ${theme.cream};
        --border: ${theme.border};
        --primary: ${theme.primary};
        --gold: ${theme.gold};
        --ink: ${theme.ink};
        --muted: ${theme.muted};
        --shadow-soft: ${theme.shadow};
        --font-heading: ${theme.fontHeading};
        --font-body: ${theme.fontBody};
    }
    .pembeli-container {
        width: min(1200px, 100%);
        margin: 0 auto;
        padding: 0 clamp(20px, 4vw, 48px);
    }
    .pembeli-label {
        color: var(--primary);
        font-size: 11px;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        font-weight: 600;
        font-family: var(--font-body);
        margin: 0;
    }
    .pembeli-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
        border-radius: 2px;
        font-size: 13px;
        font-weight: 600;
        padding: 10px 18px;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        cursor: pointer;
        font-family: var(--font-body);
    }
    .pembeli-btn-primary {
        background: var(--primary);
        border-color: var(--primary);
        color: var(--cream);
    }
    .pembeli-btn-primary:hover:not(:disabled) {
        background: #a84e21;
        border-color: #a84e21;
    }
    .pembeli-btn-primary:disabled {
        opacity: 0.65;
        cursor: not-allowed;
    }
    .pembeli-btn-outline {
        border-color: var(--ink);
        color: var(--ink);
        background: transparent;
    }
    .pembeli-btn-outline:hover {
        border-color: var(--primary);
        color: var(--primary);
    }
    .pembeli-btn-ghost {
        border-color: var(--border);
        color: var(--muted);
        background: var(--card);
    }
    .pembeli-btn-ghost:hover {
        border-color: var(--primary);
        color: var(--primary);
    }
    .pembeli-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 4px;
        box-shadow: var(--shadow-soft);
    }
    .pembeli-input {
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 2px;
        padding: 10px 14px;
        font-family: var(--font-body);
        font-size: 14px;
        color: var(--ink);
        background: var(--card);
        outline: none;
        transition: border-color 0.2s ease;
    }
    .pembeli-input:focus {
        border-color: var(--primary);
    }
    .pembeli-nav-link {
        text-decoration: none;
        font-size: 13px;
        color: var(--muted);
        border-bottom: 1px solid transparent;
        padding-bottom: 6px;
        transition: all 0.2s ease;
    }
    .pembeli-nav-link:hover,
    .pembeli-nav-link.is-active {
        color: var(--ink);
        border-bottom-color: var(--primary);
    }
    @media (max-width: 768px) {
        .pembeli-nav-center { display: none; }
        .pembeli-nav-mobile { display: flex !important; }
    }
`
