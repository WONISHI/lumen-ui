import { describe, test, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

const onChange = vi.fn();

describe("Collapse.vue", () => {
  test("basic collapse", async () => {
    const wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} onChange={onChange}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["Icon"],
        },
        attachTo: document.body,
      }
    );
    const headers = wrapper.findAll(".lu-collapse-item__header");
    const contents = wrapper.findAll(".lu-collapse-item__content");
    // 长度
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);

    // 文本
    const firstHeader = headers[0];
    const secondHeader = headers[1];
    expect(firstHeader.text()).toBe("title a");

    // 内容
    const firstContent = contents[0];
    const secondContent = contents[1];
    const disableContent = contents[2];
    expect(firstContent.isVisible()).toBeTruthy();
    expect(secondContent.isVisible()).toBeFalsy();

    expect(firstContent.text()).toBe("content a");

    // 行为
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    expect(onChange).toHaveBeenCalledWith([]);
    await secondHeader.trigger("click");
    expect(secondContent.isVisible()).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith(["b"]);

    // disabled
    const disableHeader = headers[2];
    expect(disableHeader.classes()).toContain("is-disabled");
    await disableHeader.trigger("click");
    expect(disableContent.isVisible()).toBeFalsy();
  });
});
