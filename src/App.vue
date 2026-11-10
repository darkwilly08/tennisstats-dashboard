<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppLayout from './app/AppLayout.vue';
import MarketingPaywall from './pages/MarketingPaywall.vue';
import { isUserSubscribed } from './shared/services/firebase';

const route = useRoute();

const canAccess = computed(() => {
  if (route.name === 'settings' || route.path === '/settings') {
    return true;
  }
  return isUserSubscribed.value;
});
</script>

<template>
  <AppLayout>
    <div v-if="!canAccess">
      <MarketingPaywall />
    </div>
    <RouterView v-else v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </AppLayout>
</template>
