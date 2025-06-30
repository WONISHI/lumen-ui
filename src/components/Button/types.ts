import type { PropType } from "vue";
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "small" | "medium" | "large";
export type NativeType = "button" | "submit" | "reset";
export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: ButtonType;
  /**
   * 按钮大小
   */
  size?: ButtonSize;
  /**
   *   
   */
  plain?: boolean;
  /**
   * 按钮是否禁用
   */
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofucs?: boolean;
}
export interface ButtonInstance {
  ref: HTMLButtonElement;
}
export const buttonProps={
  type:{
    type:String as PropType<ButtonType>,
  },
  size:{
    type:String as PropType<ButtonSize>,
  },
  plain:{
    type:Boolean
  },
  round:{
    type:Boolean
  },
  circle:{
    type:Boolean
  },
  disabled:{
    type:Boolean
  }
}