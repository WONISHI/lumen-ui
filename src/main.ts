import "./styles/index.css";
// 图标
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import testPlugin from "./demo/index";

import { createApp } from "vue";
import App from "./App.vue";

// 预处理
library.add(fas);

createApp(App).use(testPlugin).mount("#app");
