import type { VNode } from "vue";
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: string;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  renderLabel?: ReaderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}

export interface SelectState {
  inputValue: string;
  selectedOption: SelectOption | null;
  mouseHover: boolean;
  loading: boolean;
  highlightedIndex: number;
}

export type ReaderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;

export interface SelectEmits {
  (e: "change", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "visible-change", value: boolean): void;
  (e: "clear"): void;
}
