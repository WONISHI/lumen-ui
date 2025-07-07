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
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofucs="autofucs"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot />
    </span>
  </button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { ButtonProps } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({ name: "LuButton" });
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});
const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref,
});
</script>

<style scoped></style>
