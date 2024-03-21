import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
    },
  },
  server: {
    port: 3000,
    //https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
    proxy: {
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
