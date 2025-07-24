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
      'is-focus': isFocus,
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
        <input
          class="lu-input__inner"
          :type="type"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span v-if="$slots.suffix || showClear" class="lu-input__suffix">
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="lu-input__clear"
            @click="clear"
          ></Icon>
        </span>
      </div>
      <div v-if="$slots.append" class="lu-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="lu-input__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "LuInput",
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
});
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const isFocus = ref(false);
const emits = defineEmits<InputEmits>();
const innerValue = ref(props.modelValue);
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
};
const handleFocus = () => {
  isFocus.value = true;
};
const handleBlur = () => {
  isFocus.value = false;
};
const clear=()=>{
    innerValue.value=''
    emits("update:modelValue", innerValue.value);
}
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>
<style></style>
