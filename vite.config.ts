// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Estas líneas recrean __dirname porque en ESM no existe
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(), // ⚛️ soporte para React + JSX + Fast Refresh
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 🧩 para usar "@/components/..."
    },
  },
  css: {
    postcss: "./postcss.config.cjs", // 🎨 soporte para Tailwind CSS
  },
  server: {
    port: 5173, // 🌐 puerto de desarrollo
    open: true, // abre el navegador automáticamente
  },
  build: {
    outDir: "dist", // 📦 carpeta de salida
    sourcemap: true, // útil para depuración
  },
});
