<template>
  <form class="lu-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide } from "vue";
import type { FormProps } from "./types";
import { formContextKey } from "./types";
const props = defineProps<FormProps>();
defineOptions({
  name: "LuForm",
});
provide(formContextKey, props);
</script>
