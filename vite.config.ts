import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
// @ts-ignore
import eslint from "vite-plugin-eslint";
import VueMacros from "unplugin-vue-macros";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),
    eslint({
      include: ["src/**/*.ts", "src/**/*.vue"],
    }),
    vueDevTools(),
    visualizer({
      open: true, // 直接在浏览器中打开分析报告
      filename: "stats.html", // 输出文件的名称
      gzipSize: true, // 显示gzip后的大小
      brotliSize: true, // 显示brotli压缩后的大小
    }),
    dts({
      tsconfigPath:'tsconfig.build.json'
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "lumenUI",
      fileName: "lumen-ui",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
