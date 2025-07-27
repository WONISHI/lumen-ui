<template>
  <div
    class="lu-switch"
    :class="{
      [`lu-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="lu-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="lu-switch__core">
      <div class="lu-switch__core-inner">
        <span v-if="activeText || inactiveText" class="lu-switch__core-text">
          {{ checked ? activeText : inactiveText}}
        </span>
      </div>
      <div class="lu-switch__core-action"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { SwitchProps, SwitchEmits } from "./types";
import { ref, computed, onMounted, watch } from "vue";
defineOptions({
  name: "LuSwitch",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const innerValue = ref(props.modelValue);
const input = ref<HTMLInputElement>();
const checked = computed(() => innerValue.value === props.activeValue);
const switchValue = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits("update:modelValue", newValue);
  emits("change", newValue);
};
onMounted(() => {
  input.value!.checked = checked.value;
});
watch(checked, (val) => {
  input.value!.checked = val;
});
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>
