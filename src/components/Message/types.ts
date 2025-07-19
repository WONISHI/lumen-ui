import type { VNode, ComponentInternalInstance } from "vue";
export interface MessageProps {
  message?: string | VNode;
  type?: "success" | "warning" | "info" | "error";
  duration?: number;
  showClose?: boolean;
  onDestory: () => void;
  offet?: number;
  id?: string;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
}

export type CreateMessageProps = Omit<MessageProps, "onDestory">;
