<template>
  <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      class="lu-message"
      v-show="visible"
      :class="{
        [`lu-message--${props.type}`]: props.type,
        'is-close': showClose,
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
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
  </Transition>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch, computed, nextTick } from "vue";
import type { MessageProps } from "./types";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./methods";
import useEventListener from "@/hooks/useEventListener";
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offet: 20,
  transitionName: "fade-up",
});
console.log(props)
const visible = ref(false);
const messageRef = ref<HTMLElement>();
//计算偏移高度
// 这个div高度
const height = ref(0);
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id!));
//这个元素应该十一的是top
const topOffset = computed(() => props.offet + lastOffset.value);
// 这个元素为下一个元素预留的offset，也就是最底端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value);
let timer: any;
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}));
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
onMounted(async () => {
  visible.value = true;
  startTimer();
  // await nextTick();
  // height.value = messageRef.value!.getBoundingClientRect().height;
});
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    visible.value = false;
  }
}
useEventListener(document, "keydown", keydown);
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestory();
//   }
// });
function destroyComponent() {
  props.onDestory();
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}
defineExpose({
  bottomOffset,
  visible,
});
</script>
<style></style>
