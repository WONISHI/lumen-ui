<template>
  <div class="lu-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="lu-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="lu-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              <RenderVnode :vNode="item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOptions } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import RenderVnode from "../Common/RenderVnode";
const tooltipRef = ref() as Ref<TooltipInstance>;
const props = withDefaults(defineProps<DropdownProps>(),{
    hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();
const visibleChange = (visible: boolean) => {
  emits("visible-change", visible);
};
const itemClick = (e: MenuOptions) => {
  if (e.disabled) {
    return;
  }
  emits("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};
defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  hide: tooltipRef.value?.hide,
});
</script>
