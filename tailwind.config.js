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
        dark: {
          bg: '#05070F',
          card: 'rgba(13, 17, 30, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#F3F4F6',
          muted: '#9CA3AF'
        },
        brand: {
          blue: '#2563EB',
          indigo: '#4F46E5',
          purple: '#7C3AED',
          cyan: '#0891B2',
          pink: '#DB2777'
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
        'neon-blue': '0 0 15px rgba(37, 99, 235, 0.5)',
        'neon-purple': '0 0 15px rgba(124, 58, 237, 0.5)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0h40v2H0V0zm0 0v40h2V0H0z' fill='%23ffffff' fill-opacity='.03'/%3E%3C/svg%3E\")",
        'grid-pattern-light': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 0h40v2H0V0zm0 0v40h2V0H0z' fill='%23000000' fill-opacity='.03'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
