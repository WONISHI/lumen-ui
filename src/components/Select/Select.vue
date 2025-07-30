<template>
  <div class="lu-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip ref="tooltipRef" placement="bottom-start" :manual="true">
      <Input v-model="states.inputValue" :disabled="disabled" :placeholder="placeholder" />
      <template #content>
        <ul class="lu-select__item">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="lu-select__menu-item"
              :class="{
                'is-diabled': disabled,
                'is-active': item.value === states.selectedOption?.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import type { SelectProps, SelectEmits, SelectOption, SelectState } from "./types";
import { ref, reactive } from "vue";
import type { Ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
defineOptions({
  name: "LuSelect",
});
const findOptions = (value: string) => {
  const option = props.options.find((item) => item.value === value);
  return option ? option : null;
};
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
const isDropdownShow = ref(false);
const initialOption = findOptions(props.modelValue);
const states = reactive<SelectState>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
});
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  controlDropdown(false);
};
</script>
<style lang="scss" scoped></style>
