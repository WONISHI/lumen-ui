import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";
const vueMacrosPlugins: any = await VueMacros.vite({
  setupComponent: false,
  setupSFC: false,
  plugins: {
    vueJsx: vueJsx(),
  },
});
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "lumen-ui",
  description: "A VitePress Site",
  vite: {
    plugins: [...vueMacrosPlugins],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button" },
      { text: "Test", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Basic",
        items: [
          { text: "Button", link: "/components/button" },
          { text: "Icon", link: "/components/Icon" },
        ],
      },
      {
        text: "Form表单组件",
        items: [
          { text: "Select", link: "/components/select" },
          { text: "Input", link: "/components/input" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/WONISHI/lumen-ui" }],
  },
});
