import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // index: fileURLToPath(new URL("./index.html", import.meta.url)),
        // v1: fileURLToPath(new URL("./src/v1.tsx", import.meta.url)),
        main: fileURLToPath(new URL("./src/main.tsx", import.meta.url)),
      },
      output: {
        manualChunks: false as any,
        inlineDynamicImports: true,
        entryFileNames: "[name].js", // currently does not work for the legacy bundle
        assetFileNames: "[name].[ext]", // currently does not work for images
      },
    },
  },
});
