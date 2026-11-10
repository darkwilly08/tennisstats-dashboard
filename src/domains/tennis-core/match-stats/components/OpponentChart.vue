<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-semibold text-lg text-on-surface">{{ t('analytics.opponentsChart', 'Results by Opponent') }}</h3>
      <div class="flex gap-4 text-xs font-bold">
        <div class="flex items-center gap-1.5 text-primary"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span> WON</div>
        <div class="flex items-center gap-1.5 text-on-surface-variant"><span class="w-2.5 h-2.5 rounded-full bg-secondary"></span> LOST</div>
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
import { useI18n } from '@/shared/i18n';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.defaults.color = '#64748B';
ChartJS.defaults.borderColor = 'rgba(148, 163, 184, 0.25)';

defineProps<{
  chartData: any
}>();

const { t } = useI18n();

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
      grid: { color: 'rgba(148, 163, 184, 0.2)' },
      ticks: {
        stepSize: 1
      }
    }
  }
});
</script>
