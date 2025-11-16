import { defineComponent, computed, Fragment, ref } from "vue";
import type { PropType } from "vue";
import type { Placement, Options } from "@popperjs/core";
import type { MenuOptions } from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import Tooltip from "../Tooltip/Tooltip.vue";
export default defineComponent({
  name: "LuDropdown",
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
    },
    trigger: {
      type: String as PropType<"hover" | "click">,
      default: "hover",
    },
    transition: {
      type: String,
      default: "fade",
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOptions[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    manual: {
      type: Boolean,
    },
  },
  emits: ["visible-change", "select"],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null);
    const itemClick = (e: MenuOptions) => {
      if (e.disabled) {
        return;
      }
      emit("select", e);
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };
    const visibleChange = (visible: boolean) => {
      emit("visible-change", visible);
    };
    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder" /> : ""}
            <li
              class={{
                "lu-dropdown__item": true,
                "is-disabled": item.disabled,
                "is-divided": item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        );
      });
    });
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    });
    return () => (
      <div class="lu-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          openDelay={props.openDelay}
          close-delay={props.closeDelay}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="lu-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    );
  },
});
