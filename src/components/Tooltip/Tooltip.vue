<template>
  <div class="lu-tooltip" v-on="outerEvents">
    <div class="lu-tooltip__trigger" ref="triggerNode" v-on="events">
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
import { ref, watch, reactive } from "vue";
import { type Instance, createPopper } from "@popperjs/core";
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
let popperInstance: null | Instance = null;
let events: Record<string, any> = reactive({});
let outerEvents: Record<string, any> = reactive({});
const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};
const open = () => {
  isOpen.value = true;
  emits("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emits("visible-change", false);
};

const attachEvents = () => {
  if (props.trigger === "hover") {
    events["mouseenter"] = open;
    outerEvents["mouseleave"] = close;
  } else {
    events["click"] = togglePopper;
  }
};
attachEvents();
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {};
      outerEvents = {};
      attachEvents();
    }
  }
);
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
