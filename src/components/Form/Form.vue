<template>
  <form class="lu-form">
    <slot />
  </form>
</template>
<script setup lang="ts">
import { provide } from "vue";
import type { FormProps, FormItemContext, FormContext, FormValidateFailure,FormInstance } from "./types";
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
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const fileld of fields) {
    try {
      await fileld.validate();
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = { ...validationErrors, ...error.fields };
    }
  }
  if (Object.keys(validationErrors).length) return true;
  return Promise.reject(validationErrors);
};
provide(formContextKey, {
  ...props,
  addField,
  removeField,
});
defineExpose({
  validate,
})
</script>
