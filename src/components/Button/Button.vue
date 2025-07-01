<template>
  <button
    ref="_ref"
    class="lu-button"
    :class="{
      [`lu-button--${type}`]: type,
      [`lu-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofucs="autofucs"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { ButtonProps } from "./types";
defineOptions({ name: "LuButton" });
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>

<style scoped>
@import './style.css'
</style>
