import type { VNode, ComponentInternalInstance } from "vue";
export interface MessageProps {
  message?: string | VNode;
  type?: "info" | "success" | "warning" | "danger";
  duration?: number;
  showClose?: boolean;
  onDestory: () => void;
  offset?: number;
  id?: string;
  zIndex: number;
  transitionName?: string;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}

export type CreateMessageProps = Omit<MessageProps, "onDestory" | "id" | "zIndex">;
