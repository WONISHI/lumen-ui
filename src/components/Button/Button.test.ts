import { describe, test,expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button.vue", () => {
  test("basic button", () => {
    const wrapper = mount(Button, {
      props: {
        type: "primary",
      },
      slots:{
        default:'button'
      }
    });
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain("lu-button--primary");
    // slot 
    // get,find
    console.log(expect(wrapper.get('button').text()))
    expect(wrapper.get('button').text()).toBe('button')
    // events
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  });

  test("disabled",()=>{
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots:{
        default:'disabled'
      }
    });
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
});
