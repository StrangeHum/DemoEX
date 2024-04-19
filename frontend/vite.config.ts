import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@src": "/src",
      "@types": "/src/types",
      "@components": "/src/components",
      "@styles": "/src/styles",
      "@utils": "/src/styles/utils",
    },
  },
  server: {
    port: 3001,
    //https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
