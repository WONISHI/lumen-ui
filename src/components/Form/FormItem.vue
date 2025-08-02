<template>
  <div
    class="lu-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <label class="lu-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="lu-form-item__content">
      <slot :validate="validate" />
      <div class="lu-form-item__error" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed, reactive, provide } from "vue";
import { isNil } from "lodash-es";
import Schema from "async-validator";
import { formContextKey, formItemContextKey } from "./types";
import type { FormItemProps, FormValidateFailure, FormItemContext } from "./types";
defineOptions({
  name: "LuFormItem",
});
const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);
const validateStatus = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});

const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && !isNil(rules[props.prop])) {
    return rules[props.prop];
  } else {
    return [];
  }
});

const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger && !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};

const validate = async (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  if (triggeredRules.length === 0) return true;
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    });
    validateStatus.loading = true;
    validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = "success";
        console.log("no error");
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg = errors && errors.length ? errors[0].message || "" : "";
        console.log(e.errors);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
const context: FormItemContext = {
  validate,
};
provide(formItemContextKey, context);
</script>
