<template>
  <div class="lu-grid">
    <div class="lu-grid__row">
      <div class="lu-grid__col"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GridProps } from "./types";
import { ref, computed } from "vue";
const props = withDefaults(defineProps<GridProps>(), {
  gap: 0,
});
const rowsNum = ref(props.row);
const colsNum = ref(props.col);
const gridData = ref<any[]>(props.data);
const innerValue = computed(() => {
  const total = gridData.value.length;
  let rows = rowsNum.value ?? 0;
  let cols = colsNum.value ?? 0;
  if (rows && !cols) {
    cols = Math.ceil(total / rows);
  } else if (cols && !rows) {
    rows = Math.ceil(total / cols);
  } else if (!rows && !cols) {
    throw new Error("请至少传入 rows 或 cols 中的一个");
  }
  const result: any[] = [];
  for (let r = 0; r < rows; r++) {
    const start = r * cols;
    result.push(gridData.value.slice(start, start + cols));
  }
  return result;
});
</script>
