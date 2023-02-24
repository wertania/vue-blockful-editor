import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ts({
      copyDtsFiles: true,
    }),
    vue(),
  ],

  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        style: './src/style.css',
      },
      formats: ['es', 'cjs'],
      fileName: (format, entry) => `${entry}.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
