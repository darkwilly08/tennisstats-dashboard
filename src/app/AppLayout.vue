<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
    
    <!-- Unified Top Bar -->
    <header class="sticky top-0 z-40 w-full px-4 sm:px-6 py-3 glass-panel border-b border-gray-200 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto flex justify-between items-center gap-3">
        
        <!-- Left: Hamburger & Brand Title -->
        <div class="flex items-center gap-3 sm:gap-4 min-w-0">
          <button 
            @click="isDrawerOpen = true"
            aria-label="Menu"
            class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            <span class="material-icons-round text-2xl">menu</span>
          </button>

          <div class="flex items-center gap-3 min-w-0">
            <div class="p-2 bg-primary-alt rounded-xl text-white shadow-glow hidden xs:flex items-center justify-center shrink-0">
              <span class="material-icons-round text-xl">sports_tennis</span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-primary-alt hidden sm:inline-block">Tennis Stats</span>
              </div>
              <h1 class="font-display text-lg sm:text-2xl font-bold tracking-wide uppercase leading-tight truncate">
                {{ activePageTitle }}
              </h1>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                Player: {{ displayName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Actions, Theme Switcher & Profile Avatar -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            class="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-card-dark shadow-sm border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-xs font-semibold min-h-[44px]"
          >
            <span class="material-icons-round text-primary-alt text-base">filter_list</span>
            <span>Filters</span>
          </button>

          <button 
            @click="toggleTheme" 
            aria-label="Cambiar tema"
            class="p-2.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            <span class="material-icons-round dark:hidden">dark_mode</span>
            <span class="material-icons-round hidden dark:block">light_mode</span>
          </button>

          <div 
            @click="isDrawerOpen = true"
            class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-alt to-purple-500 flex items-center justify-center text-white font-bold shadow-md text-xs sm:text-sm cursor-pointer select-none overflow-hidden shrink-0 border-2 border-white dark:border-slate-800"
            title="Abrir menú y perfil"
          >
            <img v-if="photoURL" :src="photoURL" :alt="displayName" class="w-full h-full object-cover" />
            <span v-else>{{ initials }}</span>
          </div>
        </div>

      </div>
    </header>

    <!-- Main View Slot -->
    <slot />

    <!-- Slide-Out Drawer Backdrop -->
    <div 
      v-if="isDrawerOpen" 
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity"
      @click="isDrawerOpen = false" 
    />

    <!-- Slide-Out Navigation Drawer -->
    <aside 
      class="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800"
      :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Top Drawer Header & User Profile -->
      <div class="p-6 border-b border-slate-200 dark:border-slate-800 space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-primary-alt font-display font-bold text-lg">
            <span class="material-icons-round text-2xl">sports_tennis</span>
            <span>Tennis Stats</span>
          </div>
          <button 
            @click="isDrawerOpen = false"
            aria-label="Cerrar menú"
            class="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span class="material-icons-round text-xl">close</span>
          </button>
        </div>

        <div class="flex items-center gap-3.5 pt-1">
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-primary-alt to-purple-500 flex items-center justify-center text-white font-bold text-base shadow-md overflow-hidden shrink-0">
            <img v-if="photoURL" :src="photoURL" :alt="displayName" class="w-full h-full object-cover" />
            <span v-else>{{ initials }}</span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="font-bold text-slate-900 dark:text-white truncate text-base leading-snug">
              {{ displayName }}
            </div>
            <div class="text-xs text-slate-500 dark:text-slate-400 truncate">
              {{ email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <router-link 
          to="/analytics" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/', '/analytics']) 
            ? 'bg-primary-alt/10 text-primary-alt font-bold' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span class="material-icons-round text-xl">insights</span>
          <span>Estadísticas de Partidos</span>
        </router-link>

        <router-link 
          to="/tournament" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/tournament']) 
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span class="material-icons-round text-xl">emoji_events</span>
          <span>Torneos</span>
        </router-link>

        <router-link 
          to="/kit-bag" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/kit-bag']) 
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span class="material-icons-round text-xl">work</span>
          <span>Kit Bag / Equipamiento</span>
        </router-link>

        <router-link 
          to="/scouting" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/scouting']) 
            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span class="material-icons-round text-xl">search</span>
          <span>Rivales & Scouting</span>
        </router-link>

        <button 
          @click="handleOpenSettings"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all min-h-[48px] text-left"
        >
          <span class="material-icons-round text-xl">settings</span>
          <span>Configuración & Health Connect</span>
        </button>
      </nav>

      <!-- Bottom Drawer Footer: Theme & Logout -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button 
          @click="toggleTheme"
          class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold min-h-[44px]"
        >
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-lg">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
            <span>{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
            {{ isDark ? 'Oscuro' : 'Claro' }}
          </span>
        </button>

        <button 
          @click="handleSignOut"
          class="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <span class="material-icons-round text-lg">logout</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Settings & Health Connect Modal -->
    <div v-if="showSettingsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="showSettingsModal = false" />
      
      <div class="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md p-6 space-y-5 z-10">
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-primary-alt text-2xl">settings</span>
            <h3 class="text-lg font-bold">Configuración & Sensores</h3>
          </div>
          <button @click="showSettingsModal = false" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <span class="material-icons-round">close</span>
          </button>
        </div>

        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div class="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <span class="material-icons-round text-emerald-500">favorite</span>
              <span>Health Connect & Wear OS</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Sincronización activa de frecuencia cardíaca, consumo calórico y pasos durante cada partido de tenis registrado con tu reloj inteligente.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
            <span class="text-slate-500">Versión del Dashboard</span>
            <span class="font-bold text-slate-800 dark:text-white">v1.2.0 (Production)</span>
          </div>

          <button 
            @click="triggerNativeSettings"
            class="w-full py-2.5 px-4 rounded-xl bg-primary-alt hover:bg-primary text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span class="material-icons-round text-base">tune</span>
            <span>Abrir Ajustes de la Aplicación</span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { toggleTheme, isDark } from '@/shared/services/theme';

const route = useRoute();
const { displayName, email, photoURL, initials, logout } = useAuth();

const isDrawerOpen = ref(false);
const showSettingsModal = ref(false);

const activePageTitle = computed(() => {
  const path = route.path;
  if (path === '/' || path.startsWith('/analytics')) {
    return 'MATCH ANALYTICS';
  }
  if (path.startsWith('/tournament')) {
    return 'TOURNAMENT HUB';
  }
  if (path.startsWith('/kit-bag')) {
    return 'THE KIT BAG';
  }
  if (path.startsWith('/scouting')) {
    return 'SCOUTING REPORT';
  }
  return 'TENNIS STATS';
});

const isRouteActive = (paths: string[]) => {
  return paths.includes(route.path);
};

const handleOpenSettings = async () => {
  isDrawerOpen.value = false;
  if (window.flutter_inappwebview?.callHandler) {
    try {
      await window.flutter_inappwebview.callHandler('openNativeSettings');
      return;
    } catch (e) {
      console.warn('Native openNativeSettings failed, falling back to modal:', e);
    }
  }
  showSettingsModal.value = true;
};

const triggerNativeSettings = async () => {
  if (window.flutter_inappwebview?.callHandler) {
    try {
      await window.flutter_inappwebview.callHandler('openNativeSettings');
    } catch (e) {
      console.warn('Native openNativeSettings call failed:', e);
    }
  }
  showSettingsModal.value = false;
};

const handleSignOut = async () => {
  isDrawerOpen.value = false;
  await logout();
};
</script>
