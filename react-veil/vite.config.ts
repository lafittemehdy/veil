/**
 * Build configuration for the react-veil library.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'src/index.ts',
      ),
      fileName: (format) => `react-veil.${format === 'es' ? 'js' : 'umd.cjs'}`,
      formats: ['es', 'umd'],
      name: 'ReactVeil',
    },
    rollupOptions: {
      external: [/^react(-dom)?(\/.*)?$/],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    react(),
    dts({ exclude: ['src/__tests__'], insertTypesEntry: true }),
  ],
});
