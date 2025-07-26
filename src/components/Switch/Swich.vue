<template>
  <div class="lu-switch"></div>
</template>
<script lang="ts" setup>
import type { SwitchProps, SwitchEmits } from "./types";
import { ref, computed } from "vue";
defineOptions({
  name: "LuSwitch",
  inheritAttrs: false,
});
const props = defineProps<SwitchProps>();
const emits = defineEmits<SwitchEmits>();
const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value);
</script>
