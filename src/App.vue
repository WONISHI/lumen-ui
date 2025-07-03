<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
</script>

<template>
  <header>
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
    <h3>Collapse</h3>
    <Collapse>
      <CollapseItem name="a">
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </CollapseItem>
      <CollapseItem name="b" title="bbbb">
        <div>this is content a bbb</div>
      </CollapseItem>
      <CollapseItem name="b" title="bbbb" disabled>
        <div>this is content a bbb</div>
      </CollapseItem>
    </Collapse>
  </header>
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
</style>
