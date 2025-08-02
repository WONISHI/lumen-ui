<template>
  <div
    class="lu-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :manual="true"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :readonly="!filterable || !isDropdownShow"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        @input="debounceFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="lu-input__clear"
            @mousedown.prevent="Noop"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <div class="lu-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div
          class="lu-select__nodata"
          v-else-if="filterable && (!filteredOptions || filteredOptions.length === 0)"
        >
          no matching data
        </div>
        <ul class="lu-select__item" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="lu-select__menu-item"
              :class="{
                'is-diabled': disabled,
                'is-selected': item.value === states.selectedOption?.value,
                'is-highlighted': index === states.highlightIndex,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts" setup>
import type { SelectProps, SelectEmits, SelectOption, SelectState } from "./types";
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import Icon from "../Icon/Icon.vue";
import RenderVnode from "../Common/RenderVnode";
import { isFunction, debounce } from "lodash-es";
import type { InputInstance } from "../Input/types";
defineOptions({
  name: "LuSelect",
});
const findOptions = (value: string) => {
  const option = props.options.find((item) => item.value === value);
  return option ? option : null;
};
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const timeout = computed(() => (props.remote ? 300 : 0));
const emits = defineEmits<SelectEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const isDropdownShow = ref(false);
let initialOption: any = findOptions(props.modelValue);
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});
const states = reactive<SelectState>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});
const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};
const filteredOptions = ref(props.options || []);
watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal;
  }
);
watch(
  () => props.modelValue,
  (newValue) => {
    initialOption = newValue;
  }
);
const generateFilteredOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (err) {
      console.error(err);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) => {
      return option.label.includes(searchValue);
    });
  }
  states.highlightIndex = -1;
};
const onFilter = () => {
  generateFilteredOptions(states.inputValue);
};
const debounceFilter = debounce(onFilter, timeout.value);
const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilteredOptions(states.inputValue);
    }
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
    // blur时候将之前的值回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : "";
    }
    states.highlightIndex = -1;
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp": //向上
      e.preventDefault(); //禁止页面滚动
      // states.highlightIndex = -1
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          // move up
          states.highlightIndex--;
        }
      }
      break;
    case "ArrowDown": //向下
      e.preventDefault(); //禁止页面滚动
      // states.highlightIndex = -1
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          // move up
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};
const showClearIcon = computed(() => {
  //hover上去
  // props.clearable为true
  // 必须要有选择过选项
  // input的值不为空
  return (
    props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ""
  );
});
const onClear = () => {
  states.selectedOption = null;
  states.inputValue = "";
  emits("clear");
  emits("change", "");
  emits("update:modelValue", "");
};
const Noop = () => {};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  controlDropdown(false);
  inputRef.value?.ref.focus();
};
</script>
<style lang="scss" scoped></style>
