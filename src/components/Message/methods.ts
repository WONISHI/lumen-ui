import { type CreateMessageProps, type MessageContext } from "./types";
import { render, h, shallowReactive } from "vue";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";
const instances: MessageContext[] = shallowReactive([]);
let seed = 1;
export function createMessage(props: CreateMessageProps) {
  const { nextZIndex } = useZIndex();
  const id = `message_${seed++}`;
  const container = document.createElement("div");
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance: MessageContext = {
    id,
    vnode,
    vm,
    destory: manualDestroy,
    props: newProps,
  };
  instances.push(instance);
  return instance;
}

export const getLastInstance = () => {
  return instances[instances.length - 1];
};

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) {
    return 0;
  } else {
    const prev = instances[idx - 1];
    return prev.vm.exposed!.bottomOffset.value;
  }
};

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destory();
  });
};
