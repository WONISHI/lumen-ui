<template>
  <div
    class="lu-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="lu-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="lu-collapse-item__wrapper" v-show="isActive">
        <div class="lu-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { inject, computed } from "vue";
import { collapseContextKey, type CollapseItemProps } from "./types";
import Icon from "../Icon/Icon.vue";
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
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = "0px";
    el.style.overflow = "hidden";
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave(el) {
    el.style.height = "0px";
  },
  afterLeave(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>
