import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const basePath =
  process.env.VITE_BASE_PATH ||
  (process.env.VERCEL ? "/" : "/cos30043/s10556692/A2/");

export default defineConfig({
  plugins: [vue()],
  base: basePath,
});
