import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint --ext ts --ext tsx ./src',
      },
    }),
    splitVendorChunkPlugin(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
});
