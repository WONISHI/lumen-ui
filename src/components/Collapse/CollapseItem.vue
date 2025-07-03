<template>
  <div
    class="lu-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div class="lu-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="lu-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, computed } from "vue";
import { collapseContextKey, type CollapseItemProps } from "./type";
defineOptions({
  name: "CollapseItem",
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name);
};
</script>
