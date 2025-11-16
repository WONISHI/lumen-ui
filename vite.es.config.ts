import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";
import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // @ts-ignore
    VueMacros.vite({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
      },
    }),
    visualizer({
      open: true, // 直接在浏览器中打开分析报告
      filename: "stats.html", // 输出文件的名称
      gzipSize: true, // 显示gzip后的大小
      brotliSize: true, // 显示brotli压缩后的大小
    }),
    dts({
      tsconfigPath: "tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // umd打包的体积包括了svg提交会更大
  build: {
    outDir:"dist/es",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "lumenUI",
      fileName: "lumen-ui",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "async-validator",
        "@popperjs/core",
        "axios",
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return `index.css`;
          }
          return chunkInfo.name as string;
        },
      },
    },
  },
});
