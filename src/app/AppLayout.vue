<template>
  <div 
    class="min-h-screen bg-background text-on-surface font-sans transition-colors duration-200 flex flex-col"
    style="padding-bottom: var(--safe-area-bottom, env(safe-area-inset-bottom, 0px));"
  >
    <!-- Unified Minimal Top Header with Fullscreen Safe-Area Inset Support -->
    <header 
      class="sticky top-0 z-40 w-full bg-surface border-b border-outline-variant shadow-sm transition-colors duration-200"
      style="padding-top: var(--safe-area-top, env(safe-area-inset-top, 0px));"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex justify-between items-center gap-3">
        
        <!-- Left: Hamburger Menu Button & Active Page Title -->
        <div class="flex items-center gap-3 min-w-0">
          <button 
            @click="isDrawerOpen = true"
            aria-label="Menu"
            class="p-2 rounded-xl hover:bg-surface-variant text-on-surface transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            <span class="material-icons-round text-2xl">menu</span>
          </button>

          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-icons-round text-lg">sports_tennis</span>
            </div>
            <h1 class="font-display text-base sm:text-xl font-bold tracking-wide uppercase text-on-surface truncate">
              {{ activePageTitle }}
            </h1>
          </div>
        </div>

        <!-- Right: Clean Settings Quick Action -->
        <div class="flex items-center gap-2 shrink-0">
          <button 
            @click="showSettingsModal = true"
            aria-label="Ajustes & Servicios"
            class="p-2 rounded-xl hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            title="Ajustes & Servicios"
          >
            <span class="material-icons-round text-xl">settings</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main View Slot -->
    <div class="flex-1">
      <slot />
    </div>

    <!-- Slide-Out Drawer Backdrop -->
    <div 
      v-if="isDrawerOpen" 
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity"
      @click="isDrawerOpen = false" 
    />

    <!-- Slide-Out Navigation Drawer -->
    <aside 
      class="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-surface text-on-surface z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-r border-outline"
      :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'"
      style="padding-top: var(--safe-area-top, env(safe-area-inset-top, 0px)); padding-bottom: var(--safe-area-bottom, env(safe-area-inset-bottom, 0px));"
    >
      <!-- Top Drawer Header & Real Google User Profile -->
      <div class="p-6 border-b border-outline-variant space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-primary font-display font-bold text-lg">
            <span class="material-icons-round text-2xl">sports_tennis</span>
            <span>Tennis Stats</span>
          </div>
          <button 
            @click="isDrawerOpen = false"
            aria-label="Cerrar menú"
            class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span class="material-icons-round text-xl">close</span>
          </button>
        </div>

        <div class="flex items-center gap-3.5 pt-1">
          <img 
            v-if="user?.photoURL" 
            :src="user.photoURL" 
            class="w-12 h-12 rounded-full object-cover border border-outline shadow-sm shrink-0" 
            alt="Profile"
            referrerpolicy="no-referrer"
          />
          <div 
            v-else 
            class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container font-bold text-base shadow-sm flex items-center justify-center shrink-0 border border-outline"
          >
            {{ initials }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="font-bold text-on-surface truncate text-base leading-snug">
              {{ displayName }}
            </div>
            <div class="text-xs text-on-surface-variant truncate">
              {{ email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Links (Material 3 Navigation Drawer Tokens) -->
      <nav class="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <router-link 
          to="/analytics" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/', '/analytics']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">insights</span>
          <span>Estadísticas de Partidos</span>
        </router-link>

        <router-link 
          to="/tournament" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/tournament']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">emoji_events</span>
          <span>Torneos</span>
        </router-link>

        <router-link 
          to="/kit-bag" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/kit-bag']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">work</span>
          <span>Kit Bag / Equipamiento</span>
        </router-link>

        <router-link 
          to="/scouting" 
          @click="isDrawerOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/scouting']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">search</span>
          <span>Rivales & Scouting</span>
        </router-link>

        <button 
          @click="handleOpenSettings"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-variant transition-all min-h-[48px] text-left"
        >
          <span class="material-icons-round text-xl">settings</span>
          <span>Configuración & Health Connect</span>
        </button>
      </nav>

      <!-- Bottom Drawer Footer: Logout Only (Theme Switcher Consolidated in Settings) -->
      <div class="p-4 border-t border-outline-variant">
        <button 
          @click="handleSignOut"
          class="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <span class="material-icons-round text-lg">logout</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>

    <!-- Settings Modal (Ajustes & Servicios - Exclusive Home for Theme Switcher) -->
    <div v-if="showSettingsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" @click="showSettingsModal = false" />
      
      <div class="relative bg-surface text-on-surface rounded-2xl shadow-2xl border border-outline w-full max-w-md p-6 space-y-5 z-10">
        <div class="flex items-center justify-between border-b border-outline-variant pb-3">
          <div class="flex items-center gap-2">
            <span class="material-icons-round text-primary text-2xl">settings</span>
            <h3 class="text-lg font-bold text-on-surface">Ajustes & Servicios</h3>
          </div>
          <button 
            @click="showSettingsModal = false" 
            aria-label="Cerrar ajustes"
            class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span class="material-icons-round">close</span>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Theme Configuration (Consolidated in Settings Only) -->
          <div class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-bold text-sm text-on-surface">
                <span class="material-icons-round text-primary text-lg">{{ isDark ? 'dark_mode' : 'light_mode' }}</span>
                <span>Apariencia del Tema</span>
              </div>
              <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                {{ isDark ? 'Oscuro' : 'Claro' }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                @click="setThemeMode('light')"
                class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[44px]"
                :class="!isDark 
                  ? 'bg-primary text-on-primary border-primary shadow-sm' 
                  : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
              >
                <span class="material-icons-round text-base">light_mode</span>
                <span>Modo Claro</span>
              </button>
              <button
                type="button"
                @click="setThemeMode('dark')"
                class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[44px]"
                :class="isDark 
                  ? 'bg-primary text-on-primary border-primary shadow-sm' 
                  : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
              >
                <span class="material-icons-round text-base">dark_mode</span>
                <span>Modo Oscuro</span>
              </button>
            </div>
          </div>

          <!-- Health Connect & Wear OS -->
          <div class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant space-y-2">
            <div class="flex items-center gap-2 font-bold text-sm text-on-surface">
              <span class="material-icons-round text-primary">favorite</span>
              <span>Health Connect & Wear OS</span>
            </div>
            <p class="text-xs text-on-surface-variant leading-relaxed">
              Sincronización activa de frecuencia cardíaca, consumo calórico y pasos durante cada partido registrado con tu reloj inteligente.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-surface-variant/60 border border-outline-variant flex justify-between items-center text-xs">
            <span class="text-on-surface-variant">Versión del Dashboard</span>
            <span class="font-bold text-on-surface">v1.3.0 (M3 Design System)</span>
          </div>

          <button 
            @click="triggerNativeSettings"
            class="w-full bg-primary text-on-primary hover:opacity-90 transition-all font-medium px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span class="material-icons-round text-base">tune</span>
            <span>Abrir Ajustes Nativos</span>
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
import { applyTheme, toggleTheme, isDark, type ThemeMode } from '@/shared/services/theme';

const route = useRoute();
const { user, displayName, email, initials, logout } = useAuth();

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

const setThemeMode = (mode: ThemeMode) => {
  if ((mode === 'dark') !== isDark.value) {
    toggleTheme();
  } else {
    applyTheme(mode);
  }
};

const handleOpenSettings = () => {
  isDrawerOpen.value = false;
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
