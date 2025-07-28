<template>
  <div class="lu-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip ref="tooltipRef" placement="bottom-start" :manual="true">
      <Input v-model="innerValue" :disabled="disabled" :placeholder="placeholder" />
      <template #content>
        <ul class="lu-select__item">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="lu-select__menu-item"
              :class="{ 'is-diabled': disabled }"
              :id="`select-item-${item.value}`"
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
import type { SelectProps, SelectEmits } from "./types";
import { ref } from "vue";
import type { Ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
defineOptions({
  name: "LuSelect",
});
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const innerValue = ref<string>("");
const tooltipRef = ref() as Ref<TooltipInstance>;
const isDropdownShow = ref(false);
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
</script>
<style lang="scss" scoped></style>
