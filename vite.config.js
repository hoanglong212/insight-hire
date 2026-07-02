import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: process.env.VERCEL ? "/" : "/cos30043/s10556692/A2/",
});
