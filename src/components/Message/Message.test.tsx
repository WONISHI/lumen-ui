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
    createMessage({ message: "hello world", duration: 0, offset: 100 });
    createMessage({ message: "hello world 2", duration: 0, offset: 50 });
    await rAF();
    const elements = document.querySelectorAll(".lu-message");
    expect(elements.length).toBe(2);
    const firstElementTop = getTopValue(elements[0]);
    const secondElementTop = getTopValue(elements[1]);
    // https://github.com/jsdom/jsdom/issues/1590
    // 在JS-dom 中，对应的 height 返回为零
    expect(firstElementTop).toBe(100);
    expect(secondElementTop).toBe(150);
  });
});
