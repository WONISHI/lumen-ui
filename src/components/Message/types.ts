import type { VNode } from "vue";
export interface MessageProps {
  message?: string | VNode;
  type?: "success" | "warning" | "info" | "error";
  duration?: number;
  showClose?: boolean;
  onDestory: () => void;
}
export type CreateMessageProps = Omit<MessageProps, "onDestory">;
