import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  envPrefix: ["VITE_", "SITE_"],
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"],
    alias: {
      nothing: "/src/fallbacks/missingModule.ts",
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          query: ["@tanstack/react-query"]
        }
      }
    }
  }
});
