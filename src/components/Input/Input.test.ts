import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  it("基本展示", () => {
    const wrapper = mount(Input, {
      props: {
        size: "small",
        type: "text",
      },
      slots: {
        prepend: "prepend",
        prefix: "prefix",
      },
    });
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain("lu-input--small");
    expect(wrapper.classes()).toContain("is-prepend");
    // should render input
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find(".lu-input__prepend").exists()).toBeTruthy();
    expect(wrapper.find(".lu-input__prepend").text()).toBe("prepend");

    expect(wrapper.find(".lu-input__prefix").exists()).toBeTruthy();
    expect(wrapper.find(".lu-input__prefix").text()).toBe("prefix");
    const wrapper2 = mount(Input, {
        props:{
            type:'textarea'
        }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  });
});
