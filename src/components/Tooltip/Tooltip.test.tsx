import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";
vi.mock("@popperjs/core");
const onVisibleChange = vi.fn();
describe("Tooltip.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test("basic tooltip", async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip content="hello tooltip" trigger="click" onVisible-change={onVisibleChange}>
            <button id="trigger">trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body,
      }
    );
    // 静态测试
    const triggerArea = wrapper.find("#trigger");
    expect(triggerArea.exists()).toBeTruthy();
    expect(wrapper.find(".lu-tooltip__popper").exists()).toBeFalsy();

    // 点击触发
    triggerArea.trigger("click");
    await vi.runAllTimers();
    console.log(wrapper.html());
    expect(wrapper.find(".lu-tooltip__popper").exists()).toBeTruthy();
    expect(wrapper.find(".lu-tooltip__popper").text()).toBe("hello tooltip");
    expect(onVisibleChange).toHaveBeenCalledWith(true);

    // 再次点击关闭

    triggerArea.trigger("click");
    await vi.runAllTimers();
    console.log(wrapper.html());
    expect(wrapper.find(".lu-tooltip__popper").exists()).toBeFalsy();
    // expect(wrapper.find('.lu-tooltip__popper').text()).toBe('hello tooltip');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);

    // 点击外部关闭
    wrapper.get("#outside").trigger("click");
    await vi.runAllTimers();
    expect(wrapper.find(".lu-tooltip__popper").exists()).toBeFalsy();
  });
});
