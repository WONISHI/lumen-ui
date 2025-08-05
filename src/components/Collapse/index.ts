import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";
import type { App } from "vue";

Collapse.install = (app: App) => {
  app.component(Collapse.name!, Collapse);
};

CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name!, CollapseItem);
};

export default Collapse;

export { CollapseItem };

export * from "./types";
