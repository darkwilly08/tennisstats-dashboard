<template>
  <div class="glass-panel p-6 rounded-2xl">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-semibold text-lg">Won/Lost Trends</h3>
      <div class="flex gap-4 text-xs font-bold">
        <div class="flex items-center gap-1 text-emerald-500"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> WON</div>
        <div class="flex items-center gap-1 text-primary-alt"><span class="w-2 h-2 rounded-full bg-primary-alt"></span> LOST</div>
      </div>
    </div>
    <div class="chart-container">
      <Line :data="trendChartData" :options="trendChartOptions" />
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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

// Hardcoded trends for now as calculating this from just 5 matches requires more robust timeline logic
const trendChartData = ref({
  labels: ['2020', '2021', '2022', '2023', '2024', '2026'],
  datasets: [
    {
      label: 'Won',
      data: [12, 4, 7, 3, 1, 1],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10B981',
      pointRadius: 4
    },
    {
      label: 'Lost',
      data: [5, 1, 1, 0, 0, 0],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3B82F6',
      pointRadius: 4
    }
  ]
});

const trendChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(51, 65, 85, 0.5)' }
    }
  }
});
</script>
