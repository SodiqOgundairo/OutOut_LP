import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("matter-js")) return "matter";
          if (id.includes("motion")) return "motion";
          if (id.includes("react-helmet")) return "helmet";
          if (
            id.includes("devign") ||
            id.includes("lucide-react") ||
            id.includes("@radix-ui") ||
            id.includes("@headlessui") ||
            id.includes("@heroicons")
          ) return "ui";
          if (id.includes("react-router") || id.includes("react-dom") || id.includes("/react/")) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
