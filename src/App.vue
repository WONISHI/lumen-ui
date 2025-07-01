<script setup lang="ts">
import Button from "./components/Button/Button.vue";
</script>

<template>
  <header>
    <h3>Button</h3>
    <Button type="primary">primary</Button>
    <Button type="success">success</Button>
    <Button type="warning">warning</Button>
    <Button type="info">info</Button>
    <Button type="danger">danger</Button>
    <Button plain>plain</Button>
    <Button circle>circle</Button>
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
