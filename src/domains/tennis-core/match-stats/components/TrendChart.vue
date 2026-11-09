<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-semibold text-lg text-on-surface">Won/Lost Trends</h3>
      <div class="flex gap-4 text-xs font-bold">
        <div class="flex items-center gap-1.5 text-primary"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span> WON</div>
        <div class="flex items-center gap-1.5 text-on-surface-variant"><span class="w-2.5 h-2.5 rounded-full bg-secondary"></span> LOST</div>
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

const trendChartData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Won',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#006C4C',
      backgroundColor: 'rgba(0, 108, 76, 0.15)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#006C4C',
      pointRadius: 4
    },
    {
      label: 'Lost',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#64748B',
      backgroundColor: 'rgba(100, 116, 139, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#64748B',
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
      grid: { color: 'rgba(148, 163, 184, 0.2)' },
      ticks: {
        stepSize: 1
      }
    }
  }
});
</script>
