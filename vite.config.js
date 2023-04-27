/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

// https:vitejs.dev/config/
export default defineConfig({
  define: {
    __PROCESS__: "process",
    __IMPORT__: "import.meta",
  },
  build: {
    outDir: "dist",
    target: "esnext",
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: {
        index: "./src/index.js",
        environment: "./src/environment.js",
        task_runner: "./src/task_runners/index.js",
      },
      name: "js_utils",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["process"],
    },
  },
  test: {
    // ...
    include: [
      ...configDefaults.include,
      "tests.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
  },
});
