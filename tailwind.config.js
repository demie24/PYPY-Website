/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#6366f1",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
          sky: "#0ea5e9"
        },
        scada: {
          bg: "#0B0F19",       // Deep SCADA dark
          card: "#111827",     // Dark card surface
          cardBorder: "#1e293b",
          panel: "#161E2E",    // Panel surface
          border: "#24314A",   // Border
          nominal: "#10B981",  // Normal grid state
          trip: "#EF4444",     // Tripped/fault
          warning: "#F59E0B",  // Warning
          text: "#F8FAFC",     // Primary text
          dimText: "#94A3B8"   // Muted text
        },
        viva: {
          bg: "#F8FAFC",       // Ceria High-Contrast Light background
          card: "#FFFFFF",
          cardBorder: "#E2E8F0",
          text: "#0F172A",
          dimText: "#475569"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"],
      },
      boxShadow: {
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
