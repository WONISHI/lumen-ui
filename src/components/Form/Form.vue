<template>
  <form class="lu-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide } from "vue";
import type {
  FormProps,
  FormItemContext,
  FormContext,
  FormValidateFailure,
  FormInstance,
} from "./types";
import type { ValidateFieldsError } from "async-validator";
import { formContextKey } from "./types";
const props = defineProps<FormProps>();
defineOptions({
  name: "LuForm",
});
const fields: FormItemContext[] = [];
const addField: FormContext["addField"] = (field: FormItemContext) => {
  fields.push(field);
};
const removeField: FormContext["removeField"] = (field: FormItemContext) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.resetField());
};
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.clearValidate());
};
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = { ...validationErrors, ...error.fields };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};
provide(formContextKey, {
  ...props,
  addField,
  removeField,
});

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
});
</script>
