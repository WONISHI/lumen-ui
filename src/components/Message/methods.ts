import type { CreateMessageProps } from "./types";
import { render, h } from "vue";
import MessageConstructor from "./Message.vue";
export function createMessage(props: CreateMessageProps) {
  const container = document.createElement("div");
  const destory = () => {
    render(null, container);
  };
  const newProps = {
    ...props,
    onDestory: destory,
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!);
}
