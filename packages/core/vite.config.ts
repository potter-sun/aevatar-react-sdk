import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve, isAbsolute } from "node:path";
import { defineConfig as vitestConfig } from "vitest/config";
import { vitestConfigObj } from "../../vitest-config";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      // the proper extensions will be added
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: (id) => !(isAbsolute(id) || id.startsWith(".")),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
  },
  test: vitestConfigObj,
});
