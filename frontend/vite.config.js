import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The /api proxy forwards contact-form requests to the FastAPI backend
// (backend/ folder, default port 8000) during development.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
  preview: {
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
});
