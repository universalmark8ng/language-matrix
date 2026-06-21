/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // DS Learning brand type. `sans` (DM Sans) is the UI default, `serif`
        // (Source Serif 4) is for headings, and `token` (Baloo 2, which also
        // covers Devanagari) is reserved for the playful vocabulary blocks.
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        token: ['"Baloo 2"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // DS Learning brand palette (sourced from dslearning.com.au).
        ds: {
          bg: '#FAFAF7',
          warm: '#F5F1EB',
          cream: '#FFF8ED',
          accent: '#C4582B', // terracotta — primary
          'accent-hover': '#A94A24',
          'accent-light': '#FEF0EB',
          dark: '#1C2632', // navy slate
          ink: '#1C2632',
          'ink-soft': '#4A5567',
          'ink-light': '#6B7685',
          border: '#E2DDD5',
          gold: '#B8860B',
          'gold-light': '#FDF6E3',
          green: '#2D7A4F',
          'green-light': '#EEFAF2',
        },
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-40px) scale(0.4)', opacity: '0' },
        },
        burst: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        slidefuse: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(var(--fuse-x, 0))' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'pulse-ring': 'pulse-ring 1.2s ease-out infinite',
        wave: 'wave 0.8s ease-in-out infinite',
        wiggle: 'wiggle 0.4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        bubble: 'bubble 1.6s ease-in infinite',
        burst: 'burst 0.7s ease-out forwards',
      },
    },
  },
  // Block colours arrive as full class strings (arbitrary hex values) from the
  // data model, so JIT already sees them as literals in blocks.js — no safelist
  // needed. A swapped-in vocab pack just supplies its own `ui_color` strings.
  plugins: [],
}
