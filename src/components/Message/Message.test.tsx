import { describe, expect, test, vi } from "vitest";
import { nextTick } from "vue";
import { createMessage, closeAll } from "./methods";

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick;
      });
    });
  });
};

  function getTopValue(element: Element) {
    const styles = window.getComputedStyle(element);
    const topValue = styles.getPropertyPriority("top");
    return Number.parseFloat(topValue);
  }

describe("createMessage", () => {
  test("调用方法应该创建对应的Message组件", async () => {
    const instance = createMessage({ message: "hello world", duration: 0 });
    await rAF();
    console.log("html", document.body.innerHTML);
    expect(document.querySelector(".lu-message")).toBeTruthy();
    instance.destory();
    await rAF();
    console.log("html2", document.body.innerHTML);
    expect(document.querySelector(".lu-message")).toBeFalsy();
  });
  test("调用方法应该创建对应的Message组件", async () => {
    createMessage({ message: "hello world", duration: 0 });
    createMessage({ message: "hello world 2", duration: 0 });
    await rAF();
    const elements = document.querySelectorAll(".lu-message");
    expect(elements.length).toBe(2);
    closeAll();
    await rAF();
    expect(document.querySelector(".lu-message")).toBeFalsy();
  });
  test("创建多个实例应该设置正确的offset", async () => {
    createMessage({ message: "hello world", duration: 0 });
    createMessage({ message: "hello world 2", duration: 0 });
    await rAF();
    const elements = document.querySelectorAll(".lu-message");
    expect(elements.length).toBe(2);
  });
});
