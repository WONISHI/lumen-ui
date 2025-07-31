import type { VNode } from "vue";
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  renderLabel?: ReaderLabelFunc;
}

export interface SelectState {
  inputValue: string;
  selectedOption: SelectOption | null;
  mouseHover: boolean;
}

export type ReaderLabelFunc = (option: SelectOption) => VNode;

export interface SelectEmits {
  (e: "change", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "visible-change", value: boolean): void;
  (e: "clear"): void;
}
