<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded shadow mb-4">
    <div class="flex justify-between items-start">
      <div>
        <p class="font-semibold">{{ review.reviewer }}</p>
        <p class="text-sm text-gray-500">{{ review.platform }}</p>
      </div>
      <span :class="sentimentClass">{{ review.sentiment }}</span>
    </div>
    <p class="mt-2 text-gray-700 dark:text-gray-300">{{ review.text }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  review: Object
});

const sentimentClass = computed(() => {
  switch (props.review.sentiment) {
    case 'Positive':
      return 'text-green-600';
    case 'Negative':
      return 'text-red-600';
    default:
      return 'text-yellow-600';
  }
});
</script>
