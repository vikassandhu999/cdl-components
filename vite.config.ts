/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: '@cdl',
        replacement: path.resolve(__dirname, '/src')
      }
    ]
  }
});
