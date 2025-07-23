import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  it("基本展示", () => {
    const wrapper = mount(Input, {
      props: {
        size: "small",
        type: "text",
        modelValue: "",
      },
      slots: {
        prepend: "prepend",
        prefix: "prefix",
      },
    });
    expect(wrapper.classes()).toContain("lu-input--small");
    expect(wrapper.classes()).toContain("is-prepend");
    // should render input
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get("input").attributes("type")).toBe("text");
    // slots
    expect(wrapper.find(".lu-input__prepend").exists()).toBeTruthy();
    expect(wrapper.find(".lu-input__prepend").text()).toBe("prepend");

    expect(wrapper.find(".lu-input__prefix").exists()).toBeTruthy();
    expect(wrapper.find(".lu-input__prefix").text()).toBe("prefix");
    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        modelValue: "",
      },
    });
    expect(wrapper2.find("textarea").exists()).toBeTruthy();
  });
  it("支持v-model", async () => {
    const wrapper = mount(Input, {
      props: {
        type: "text",
        modelValue: "test",
        "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });
    // 初始值
    const input = wrapper.get("input");
    expect(input.element.value).toBe("test");
    // 更新值
    await input.setValue("update");
    expect(wrapper.props("modelValue")).toBe("update");
    expect(input.element.value).toBe("update");
    // v-model的异步更新
    await wrapper.setProps({ modelValue: "prop update" });
    expect(input.element.value).toBe("prop update");
  });
});
