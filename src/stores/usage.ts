import { defineStore } from 'pinia';

export const useUsageStore = defineStore('usage', {
  state: () => ({
    limitExceeded: false
  }),
  actions: {
    triggerLimitExceeded() {
      this.limitExceeded = true;
    },
    clearLimitExceeded() {
      this.limitExceeded = false;
    }
  }
});

