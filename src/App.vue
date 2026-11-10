<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppLayout from './app/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </AppLayout>
</template>
