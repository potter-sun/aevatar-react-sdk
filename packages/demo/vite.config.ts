import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig((config) => ({
  plugins: [
    nodePolyfills(),
    vike({ prerender: true }),
    react({}),
    svgr(),
    imagetools(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": config.mode === "production" ? __dirname : resolve(__dirname, "./"),
    },
  },

  optimizeDeps: {
    // disabled: false,
    include: [],
    exclude: ["coverage"],
  },

  server: {
    proxy: {
      "/connect": {
        target: "https://auth-station-staging.aevatar.ai",
        changeOrigin: true,
        secure: false,
      },
      "/aevatarURL/api": {
        target: "https://station-staging.aevatar.ai",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/aevatarURL\/api/, "/api"),
      },
    },
  },
}));
