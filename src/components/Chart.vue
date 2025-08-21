<template>
  <div class="h-64">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  type: { type: String, default: 'pie' },
  data: { type: Object, required: true }
});

const canvas = ref(null);

onMounted(() => {
  new Chart(canvas.value, {
    type: props.type,
    data: props.data,
    options: { responsive: true, maintainAspectRatio: false }
  });
});
</script>
