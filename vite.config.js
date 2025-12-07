import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: {
      drafts: {
        nesting: false,
      },
    },
    postcss: {
      plugins: [],
    },
  },
  build: {
    cssMinify: "esbuild",
  },
});
