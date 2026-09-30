/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pypy: {
          blue: '#0071e3',
          blueHover: '#0077ed',
          navy: '#0f172a',
          slate: '#1e293b',
          muted: '#64748b',
          border: '#e2e8f0',
          cyan: '#0284c7',
          emerald: '#10b981',
          crimson: '#ef4444',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          surface: '#ffffff',
          surfaceMuted: '#f8fafc'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pypy-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 3px 0 rgba(15, 23, 42, 0.03)',
        'pypy-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
};
