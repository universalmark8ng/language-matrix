/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Devanagari-friendly stack; falls back to system fonts.
        display: ['"Baloo 2"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
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
  // Color classes arrive as full string literals from the data model, so JIT
  // already sees them. We only safelist the block background + its hover so a
  // swapped-in vocab pack (e.g. Mandarin) with new colour choices still works.
  safelist: [
    { pattern: /^bg-(blue|green|yellow|purple|pink|orange|red|teal)-(400|500)$/ },
    {
      pattern: /^bg-(blue|green|yellow|purple|pink|orange|red|teal)-(500|600)$/,
      variants: ['hover'],
    },
  ],
  plugins: [],
}
