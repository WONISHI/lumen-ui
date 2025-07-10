<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import type { NameType } from "./components/Collapse/types";
import Icon from "./components/Icon/Icon.vue";
import { ref } from "vue";
const openedValue = ref<NameType[]>(["a"]);
// setTimeout(()=>{
//   openedValue.value=['b','c']
// },3000)
</script>

<template>
  <div>
    <aside>
        <h3>Button</h3>
        <Button type="primary">primary</Button>
        <Button type="success">success</Button>
        <Button type="warning">warning</Button>
        <Button type="info">info</Button>
        <Button type="danger">danger</Button>
        <br />
        <p />
        <Button plain>plain</Button>
        <Button circle>circle</Button>
        <Button round>round</Button>
        <Button disabled>disabled</Button>
        <br />
        <p />
        <Button size="large">large</Button>
        <Button size="small">small</Button>
        <br />
        <p />
        <Button size="large" loading>loading</Button>
        <Button size="large" icon="arrow-up">arrow-up</Button>
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
h1{
  background-color: #fff;
  margin-bottom:0px;
}
aside{
  display: block;
  margin-bottom: 20px;
}
h3{
  margin-bottom: 20px;
}
</style>
