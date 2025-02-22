/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'play': 'play var(--animation-duration, 1s) steps(var(--animation-steps, 1)) infinite',
      },
      keyframes: {
        'play': {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(0)' }, // No actual movement, just for triggering GIF playback
        },
      },
    },
  },
  plugins: [],
}

