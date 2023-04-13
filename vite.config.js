import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: (app) => {
      // Use json-server as middleware
      app.use("/api", require("json-server").router("db.json"));
    },
  },
});
