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
  cleanUrls: false,
  description: "A VitePress Site",
  vite: {
    plugins: [...vueMacrosPlugins],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  ignoreDeadLinks: true,
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
    // 是否在代码块中启用行号
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/logo.svg",
    outline: { label: "目录", level: [2, 6] },
    // 主题
    darkModeSwitchLabel: "深浅模式",
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button" },
    ],

    sidebar: [
      {
        text: "Basic基础组件",
        items: [
          { text: "Button 按钮", link: "/components/button" },
          { text: "Icon 图标", link: "/components/Icon" },
        ],
      },
      {
        text: "Form表单组件",
        items: [
          { text: "Select 选择器", link: "/components/select" },
          { text: "Input 输入框", link: "/components/input" },
          { text: "Switch 开关", link: "/components/switch" },
        ],
      },
      {
        text: "Data展示组件",
        items: [
          { text: "Tooltip 文字提示", link: "/components/tooltip" },
          { text: "Grid 网格", link: "/components/grid" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/WONISHI/lumen-ui" }],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    }
  },
});
