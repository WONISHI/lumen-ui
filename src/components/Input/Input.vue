<template>
  <div
    class="lu-input"
    :class="{
      [`lu-input--${type}`]: type,
      [`lu-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <!-- input -->
    <template v-if="type != 'textarea'">
      <div v-if="$slots.prepend" class="lu-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="lu-input__wrapper">
        <span v-if="$slots.prefix" class="lu-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input class="lu-input__inner" :type="type" :disabled="disabled" />
        <span v-if="$slots.suffix" class="lu-input__suffix">
            <slot name="suffix"></slot>
        </span>
      </div>
      <div v-if="$slots.append" class="lu-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea class="lu-input__wrapper" :disabled="disabled"></textarea>
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { InputProps } from "./types";
defineOptions({
  name: "LuInput",
});
withDefaults(defineProps<InputProps>(), {
  type: "text",
});
</script>
<style></style>
