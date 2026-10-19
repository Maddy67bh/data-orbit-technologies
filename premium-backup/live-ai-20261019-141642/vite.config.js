import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three",
              test: /node_modules\/three/,
              priority: 20
            },
            {
              name: "icons",
              test: /node_modules\/lucide-react/,
              priority: 10
            }
          ]
        }
      }
    }
  }
});
