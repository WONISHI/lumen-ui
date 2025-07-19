import type { VNode, ComponentInternalInstance } from "vue";
export interface MessageProps {
  message?: string | VNode;
  type?: "success" | "warning" | "info" | "error";
  duration?: number;
  showClose?: boolean;
  onDestory: () => void;
  offet?: number;
  id?: string;
  zIndex: number;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}

export type CreateMessageProps = Omit<MessageProps, "onDestory" | "id" | "zIndex">;
