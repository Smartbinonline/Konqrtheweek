import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps the build relocatable: works on GitHub Pages project sites,
// Cloudflare Pages, or opened from any subpath.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false },
});
