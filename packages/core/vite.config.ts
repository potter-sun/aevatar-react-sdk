import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import {resolve} from 'node:path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
  })],
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@aevatar-react-sdk/core',
      // the proper extensions will be added
      fileName: 'index',
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
        },
      },
    },
  },
})
