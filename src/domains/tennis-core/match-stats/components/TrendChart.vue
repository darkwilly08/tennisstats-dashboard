<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-semibold text-lg text-on-surface">{{ t('analytics.trendsChart', 'Won/Lost Trends') }}</h3>
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
import { computed, ref } from 'vue';
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
import type { MatchPayload } from '@/domains/tennis-core/_shared/types';
import { useI18n } from '@/shared/i18n';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const props = defineProps<{
  matches?: MatchPayload[];
}>();

const { t } = useI18n();

const trendChartData = computed(() => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  
  const last6MonthIndices: number[] = [];
  for (let i = 5; i >= 0; i--) {
    let m = currentMonthIdx - i;
    if (m < 0) m += 12;
    last6MonthIndices.push(m);
  }
  const labels = last6MonthIndices.map(idx => months[idx]!);
  const wonPerMonth = [0, 0, 0, 0, 0, 0];
  const lostPerMonth = [0, 0, 0, 0, 0, 0];

  if (props.matches && props.matches.length > 0) {
    for (const match of props.matches) {
      if (!match.idt) continue;
      const d = new Date(match.idt);
      const mIdx = d.getMonth();
      const pos = last6MonthIndices.indexOf(mIdx);
      if (pos !== -1) {
        if (match.win) {
          wonPerMonth[pos] = (wonPerMonth[pos] ?? 0) + 1;
        } else {
          lostPerMonth[pos] = (lostPerMonth[pos] ?? 0) + 1;
        }
      }
    }
  }

  return {
    labels,
    datasets: [
      {
        label: 'Won',
        data: wonPerMonth,
        borderColor: '#006C4C',
        backgroundColor: 'rgba(0, 108, 76, 0.15)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#006C4C',
        pointRadius: 4
      },
      {
        label: 'Lost',
        data: lostPerMonth,
        borderColor: '#64748B',
        backgroundColor: 'rgba(100, 116, 139, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#64748B',
        pointRadius: 4
      }
    ]
  };
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
