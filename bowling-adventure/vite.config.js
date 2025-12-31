import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          cannon: ['cannon-es']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.test.js',
        'src/pdf_converter.js',
        'src/main.js',
        'src/entities/Ball.js',
        'src/entities/Pins.js',
        'src/Course.js'
      ]
    }
  }
});
