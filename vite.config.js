import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        // target: "http://192.168.1.133:8000/",
        target: "http://150.158.99.245:8000/",
        // target: "http://127.0.0.1:8080/librarySystem",
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue()],
  base: "./",
});
