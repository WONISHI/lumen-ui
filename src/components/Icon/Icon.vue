<template>
  <i class="lu-icon" :class="{ [`lu-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { omit } from "lodash-es";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineOptions({
  name: "LuIcon",
  inheritAttrs: false,
});
const props = defineProps<IconProps>();
const filteredProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>
