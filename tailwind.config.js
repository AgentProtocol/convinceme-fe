/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        surface: {
          light: '#ffffff',
          dark: '#f8fafc',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'play': 'play var(--animation-duration, 1s) steps(var(--animation-steps, 1)) infinite',
        'float-up': 'float-up 1.5s ease-out forwards',
        'hit': 'hit-effect 0.8s cubic-bezier(0.36, 0, 0.66, -0.56)'
      },
      keyframes: {
        'play': {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(0)' }, // No actual movement, just for triggering GIF playback
        },
        'float-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(0px) scale(0.5)'
          },
          '20%': { 
            opacity: '1',
            transform: 'translateY(-10px) scale(1.2)'
          },
          '100%': { 
            opacity: '0',
            transform: 'translateY(-40px) scale(0.8)'
          }
        },
        'hit-effect': {
          '0%': { 
            transform: 'scale(1) rotate(0deg)',
            filter: 'brightness(100%)'
          },
          '15%': { 
            transform: 'scale(0.85) rotate(-8deg)',
            filter: 'brightness(30%) saturate(150%)'
          },
          '30%': { 
            transform: 'scale(1.1) rotate(6deg)',
            filter: 'brightness(60%) saturate(150%)'
          },
          '45%': { 
            transform: 'scale(0.95) rotate(-4deg)',
            filter: 'brightness(80%) saturate(125%)'
          },
          '60%': { 
            transform: 'scale(1.05) rotate(2deg)',
            filter: 'brightness(90%) saturate(110%)'
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)',
            filter: 'brightness(100%)'
          }
        }
      },
    },
  },
  plugins: [],
}

