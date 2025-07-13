<template>
  <div class="lu-tooltip">
    <div class="lu-tooltip__trigger" ref="triggerNode" @click="togglePopper">
      <slot />
    </div>
    <div v-if="isOpen" class="lu-tooltip__content" ref="popperNode">
      <slot name="content">
        {{ props.content }}
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits } from "./types";
import { ref, watch } from "vue";
import { type Instance, createPopper } from "@popperjs/core";
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
let popperInstance: null | Instance = null;
const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
        });
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);
</script>
<style></style>
