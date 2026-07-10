import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const extraAllowedHosts = (process.env.VITE_ALLOWED_HOSTS || "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      ".ngrok-free.app",
      ...extraAllowedHosts
    ],
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});
