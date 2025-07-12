import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@headlessui/react',
      '@privy-io/react-auth',
      '@vercel/analytics',
      'events',
      'hls.js',
      'mic-check',
      'qrcode',
      'react-audio-visualize',
      'react-router-dom',
      'web-audio-player'
    ],
    exclude: []
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'INVALID_ANNOTATION') return;
        warn(warning);
      }
    }
  }
})
