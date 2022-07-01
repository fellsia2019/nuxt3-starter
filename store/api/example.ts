import { defineStore } from "pinia";

export const exampleApiStore = defineStore("testId", {
  state: () => ({
    counter: 0,
  }),
  getters: {},
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
});
