<template>
  <div class="index-page text-3xl font-bold underline">
    <h1 class="title">index</h1>
    <p>{{ counter }}</p>
    <button class="badge" @click="icnrementMethod()">increment</button>
  </div>
</template>

<script lang="ts">
import { exampleApiStore } from "~~/store/api/example";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = exampleApiStore();

    const { counter } = storeToRefs(store);

    return { counter, store };
  },

  methods: {
    icnrementMethod() {
      this.store.increment();
    },
  },
};
</script>

<style lang="scss">
.index-page {
  .title {
    color: blueviolet;
  }
}
</style>
