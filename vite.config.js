import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.js"),
      formats: ["cjs"],
      fileName: () => "index.js",
      name: "twitter-regexps",
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    environment: "node",
    include: ["test/*.js"],
  },
});
