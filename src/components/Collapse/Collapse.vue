<template>
  <div class="lu-collapse">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, provide } from "vue";
import type { NameType } from "./type";
import { collapseContextKey } from "./type";
defineOptions({
  name: "Collapse",
});
const activeNames = ref<NameType[]>([]);
const handleItemClick = (item: NameType) => {
  const index = activeNames.value.indexOf(item);
  if (index > -1) {
    // 存在，删除数组对应的一项
    activeNames.value.splice(index, 1);
  } else {
    // 不存在，插入对应的name
    activeNames.value.push(item);
  }
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
