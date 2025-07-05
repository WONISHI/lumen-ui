<template>
  <div class="lu-collapse">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { NameType, CollapseProps, CollapseEmits } from "./type";
import { collapseContextKey } from "./type";
defineOptions({
  name: "Collapse",
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<NameType[]>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);
if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one acitve item");
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    console.log(activeNames.value);
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      // 存在，删除数组对应的一项
      activeNames.value.splice(index, 1);
    } else {
      // 不存在，插入对应的name
      activeNames.value.push(item);
    }
  }
  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
