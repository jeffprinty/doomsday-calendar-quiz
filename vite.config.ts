import path from 'node:path';

import { partytownVite } from '@builder.io/partytown/utils';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint --ext ts --ext tsx ./src',
      },
    }),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    })
  ],
  base: '/doomsday-calendar-quiz',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
});
