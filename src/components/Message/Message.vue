<template>
  <div
    class="lu-message"
    v-show="visible"
    :class="{
      [`lu-message--${props.type}`]: props.type,
      'is-close': showClose,
    }"
    role="alert"
  >
    <div class="lu-message__content">
      <slot>
        <RenderVnode :vNode="message" v-if="message" />
      </slot>
    </div>
    <div class="lu-message__close" v-if="showClose">
      <Icon icon="xmark" @click.stop="visible = false"></Icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref,watch } from "vue";
import type { MessageProps } from "./types";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
});
const visible = ref(false);
function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
onMounted(() => {
  visible.value = true;
  startTimer();
});
watch(visible, (newValue) => {
  if (!newValue) {
    props.onDestory();
  }
});
</script>
<style>
.lu-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
