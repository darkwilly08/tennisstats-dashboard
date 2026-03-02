<template>
  <div class="glass-panel p-6 rounded-2xl">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-semibold text-lg">Results by Opponent</h3>
      <div class="flex gap-4 text-xs font-bold">
        <div class="flex items-center gap-1 text-emerald-500"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> WON</div>
        <div class="flex items-center gap-1 text-primary-alt"><span class="w-2 h-2 rounded-full bg-primary-alt"></span> LOST</div>
      </div>
    </div>
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.defaults.color = '#94a3b8';
ChartJS.defaults.borderColor = '#334155';

const props = defineProps<{
  chartData: any
}>();

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: 'rgba(51, 65, 85, 0.5)' },
      ticks: {
        stepSize: 1
      }
    }
  }
});
</script>
