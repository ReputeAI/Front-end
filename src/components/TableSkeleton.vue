<template>
  <table class="min-w-full">
    <tbody>
      <tr v-for="r in rows" :key="r" class="animate-pulse">
        <td v-for="c in cols" :key="c" class="p-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  rows: { type: Number, default: 5 },
  cols: { type: Number, default: 5 }
});
</script>
