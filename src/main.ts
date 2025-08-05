import "./styles/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import testPlugin from "./demo/index";

import { createApp } from "vue";
import App from "./App.vue";

library.add(fas);

createApp(App).use(testPlugin).mount("#app");
