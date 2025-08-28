<template>
  <button
    :class="['inline-flex items-center justify-center rounded-md px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed', variantClasses]"
    v-bind="$attrs"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 mr-2 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span><slot /></span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    default:
      return 'bg-primary text-white hover:bg-primary/90';
  }
});
</script>
