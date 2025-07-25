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
    // 注意setValue是组合事件会触发input以及change
    await input.setValue("update");
    expect(wrapper.props("modelValue")).toBe("update");
    expect(input.element.value).toBe("update");

    console.log("the events", wrapper.emitted());
    //{
    // 'update:modelValue': [ [ 'update' ] ],
    // input: [ [ [Event] ] ],
    // change: [ [ [Event] ] ]
    // }
    expect(wrapper.emitted()).toHaveProperty("input");
    expect(wrapper.emitted()).toHaveProperty("change");
    const inputEvents = wrapper.emitted("input");
    const changeEvents = wrapper.emitted("change");
    expect(inputEvents![0]).toEqual(["update"]);
    expect(changeEvents![0]).toEqual(["update"]);
    // v-model的异步更新
    await wrapper.setProps({ modelValue: "prop update" });
    expect(input.element.value).toBe("prop update");
  });
  it("支持点击清空字符串", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        clearable: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    });
    // 不出现对应的Icon区域
    expect(wrapper.find(".lu-input__clear").exists()).toBeFalsy();
    const input = wrapper.get("input");
    await input.trigger("focus");
    expect(wrapper.emitted()).toHaveProperty("focus");
    //出现Icon区域
    expect(wrapper.find(".lu-input__clear").exists()).toBeTruthy();
    //点击值变为空并且消失
    await wrapper.find(".lu-input__clear").trigger("click");
    expect(input.element.value).toBe("");
    // 点击值变为空并且消失，特别注意这里不仅仅会触发clear事件，对应的input以及change应该都会被触发
    expect(wrapper.emitted()).toHaveProperty("clear");
    expect(wrapper.emitted()).toHaveProperty("input");
    expect(wrapper.emitted()).toHaveProperty("change");
    const inputEvents = wrapper.emitted("input");
    const changeEvents = wrapper.emitted("change");
    expect(inputEvents![0]).toEqual([""]);
    expect(changeEvents![0]).toEqual([""]);
    await input.trigger("blur");
    expect(wrapper.emitted()).toHaveProperty("focus");
  });
  it("支持切换密码显示", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "",
        showPassword: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    });
    // 不出现对应的Icon区域,因为当前值为空
    expect(wrapper.find(".lu-input__password").exists()).toBeFalsy();
    const input = wrapper.get("input");
    expect(input.element.type).toBe("password");
    //出现Icon区域，并且Icon为特点的图标
    await input.setValue("123");
    const eyeIcon = wrapper.find(".lu-input__password");
    expect(eyeIcon.exists()).toBeTruthy();
    expect(eyeIcon.attributes("icon")).toBe("eye-slash");
    // 点击值变为input类型，并且图标的Icon会切换
    await eyeIcon.trigger("click");
    expect(input.element.type).toBe("text");
    // 为什么不适应eyeIcon
    // console.log(eyeIcon.html())
    expect(eyeIcon.attributes("icon")).toBe("eye");
    expect(wrapper.find(".lu-input__password").attributes("icon")).toBe("eye");
  });
});
