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
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          ref="inputRef"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofucus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="lu-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="lu-input__clear"
            @click="clear"
            @mousedown.prevent="Noop"
          ></Icon>
          <Icon
            v-if="showPasswordArea"
            :icon="passwordVisible ? 'eye' : 'eye-slash'"
            class="lu-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <div v-if="$slots.append" class="lu-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea
        class="lu-input__wrapper"
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofucus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, useAttrs, nextTick } from "vue";
import type { InputProps, InputEmits } from "./types";
import Icon from "../Icon/Icon.vue";
import type { Ref } from "vue";
defineOptions({
  name: "LuInput",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);
const isFocus = ref(false);
const passwordVisible = ref(false);
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const inputRef = ref() as Ref<HTMLInputElement>;
const Noop = () => {};
const keepFocus = async () => {
  await nextTick();
  inputRef.value?.focus();
};
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
};
const handleChange = () => {
  emits("change", innerValue.value);
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
};
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const clear = () => {
  innerValue.value = "";
  emits("update:modelValue", innerValue.value);
  emits("clear");
  emits("input", "");
  emits("change", "");
};
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
defineExpose({
  ref: inputRef,
});
</script>
<style></style>
