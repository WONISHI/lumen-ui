<template>
  <i
    class="lu-icon"
    :class="{ [`lu-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineOptions({
  name: "LuIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

const customStyles = computed(() => {
  return {
    color: props.color,
  };
});

function cleanProps<T extends Record<string, any>>(obj: T) {
  const result: any = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined) result[key] = value;
  }
  return result as T;
}

const filteredProps = computed(() =>
  cleanProps({
    border: props.border,
    fixedWidth: props.fixedWidth,
    flip: props.flip,
    icon: props.icon, // 必填
    mask: props.mask,
    maskId: props.maskId,
    listItem: props.listItem,
    pull: props.pull,
    pulse: props.pulse,
    rotation: props.rotation,
    swapOpacity: props.swapOpacity,
    size: props.size,
    spin: props.spin,
    transform: props.transform,
    title: props.title,
    titleId: props.titleId,
    inverse: props.inverse,
    bounce: props.bounce,
    shake: props.shake,
    beat: props.beat,
    fade: props.fade,
    beatFade: props.beatFade,
    spinPulse: props.spinPulse,
    spinReverse: props.spinReverse,
    symbol: props.symbol,
  })
);
</script>
