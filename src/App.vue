<script setup lang="ts">
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown";
import { createMessage } from "./components/Message/methods";
import type { NameType } from "./components/Collapse/types";
import type { TooltipInstance } from "./components/Tooltip/types";
import type { Options } from "@popperjs/core";
import Icon from "./components/Icon/Icon.vue";
import { createPopper } from "@popperjs/core";
import { ref, onMounted, h, getCurrentInstance, inject } from "vue";
import VNode from "./components/VNode/VNode.tsx";
const openedValue = ref<NameType[]>(["a"]);
const overlayNode = ref<HTMLElement | null>(null);
const triggerNode = ref<HTMLElement | null>(null);
const tooltipRef = ref<TooltipInstance | null>(null);
const options: Partial<Options> = { placement: "right-end", strategy: "fixed" };
// setTimeout(()=>{
//   openedValue.value=['b','c']
// },3000)
onMounted(async () => {
  if (triggerNode.value && overlayNode.value) {
    createPopper(triggerNode.value, overlayNode.value, {
      placement: "bottom",
    });
  }
  console.log(getCurrentInstance(),inject("test"));
  createMessage({ message: "hello word", duration: 80000, showClose: true, type: "info" });
  createMessage({ message: "hello world again", duration: 4000, showClose: true, type: "danger" });
});
</script>

<template>
  <div>
    <aside>
      <!--  -->
      <!-- <h3>Button{{ $echo("viking") }}</h3> -->
      <v-button type="primary">primary</v-button>
      <v-button type="success">success</v-button>
      <v-button type="warning">warning</v-button>
      <v-button type="info">info</v-button>
      <v-button type="danger">danger</v-button>
      <br />
      <p />
      <v-button plain>plain</v-button>
      <v-button circle>circle</v-button>
      <v-button round>round</v-button>
      <v-button disabled>disabled</v-button>
      <br />
      <p />
      <v-button size="large">large</v-button>
      <v-button size="small">small</v-button>
      <br />
      <p />
      <v-button size="large" loading>loading</v-button>
      <v-button size="large" icon="arrow-up">arrow-up</v-button>
    </aside>
    <aside>
      <h3>Collapse</h3>
      <Collapse v-model="openedValue" accordion>
        <CollapseItem name="a">
          <template #title>
            <h1>标题a nice title</h1>
          </template>
          <h1>headline title</h1>
          <div>this is content a aaa</div>
        </CollapseItem>
        <CollapseItem name="b" title="标题b">
          <div>this is content a bbb</div>
        </CollapseItem>
        <CollapseItem name="c" title="标题c" disabled>
          <div>this is content a bbb</div>
        </CollapseItem>
      </Collapse>
    </aside>
    <aside>
      <h3>Icon</h3>
      <Icon icon="fa-solid fa-user-secret" />
      <Icon icon="arrow-up" size="2xl" spin />
    </aside>
    <aside>
      <h3>VNode</h3>
      <VNode msg="hello world"></VNode>
    </aside>
    <aside>
      <h3>test</h3>
      <div>
        <div ref="triggerNode">我是按钮</div>
        <div ref="overlayNode">
          <span>我是描述</span>
        </div>
      </div>
    </aside>
    <aside>
      <h3>Tooltip</h3>
      <Tooltip placement="right">
        <span>鼠标悬停在我上面</span>
        <template #content>
          <span>自定义提示内容</span>
        </template>
      </Tooltip>
      <Tooltip placement="right" manual ref="tooltipRef" :popperOptions="options">
        <span>鼠标悬停在我上面</span>
        <template #content>
          <span>自定义提示内容</span>
        </template>
      </Tooltip>
      <Button @click="tooltipRef?.show()">手动显示</Button>
      <Button @click="tooltipRef?.hide()">关闭</Button>
      <Tooltip placement="right" :open-delay="3000" :close-delay="3000">
        <span>鼠标悬停在我上面</span>
        <template #content>
          <span>自定义提示内容</span>
        </template>
      </Tooltip>
    </aside>
    <aside>
      <h3>Dropdown</h3>
      <Dropdown
        :menu-options="[
          { key: '1', label: '选项1' },
          { key: '2', label: h('b', '选项2'), disabled: true },
          { key: '3', label: '选项3' },
          { key: '4', label: '选项4', divided: true },
          { key: '5', label: '选项5' },
        ]"
        trigger="click"
        placement="bottom-start"
        @select="(key) => console.log(key)"
        @visible-change="(visible) => console.log(visible)"
      >
        <Button>点击我</Button>
      </Dropdown>
    </aside>
    <aside>
      <!-- <Message message="hello" :duration="0" :show-close="true"></Message> -->
    </aside>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
h1 {
  background-color: #fff;
  margin-bottom: 0px;
}
aside {
  display: block;
  margin-bottom: 20px;
}
h3 {
  margin-bottom: 20px;
}
</style>
