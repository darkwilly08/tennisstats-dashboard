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

        <!-- Right: Clean Settings Direct Route (No intermediate modal) -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            @click="handleNavigateToSettings"
            aria-label="Configuración (Ajustes & Servicios)"
            title="Configuración"
            class="p-2 rounded-xl hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            <span class="material-icons-round text-xl">settings</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main View Slot with Smooth Transition -->
    <div class="flex-1">
      <slot />
    </div>

    <!-- Global M3 Snackbar / Toast Notifications -->
    <SnackbarContainer />

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

        <router-link 
          to="/settings"
          @click="isDrawerOpen = false"
          role="button"
          aria-label="Configuración & Health Connect"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/settings']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">settings</span>
          <span>Configuración</span>
        </router-link>
      </nav>

      <!-- Bottom Drawer Footer: Logout Only -->
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

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import SnackbarContainer from '@/shared/components/SnackbarContainer.vue';

const route = useRoute();
const router = useRouter();
const { user, displayName, email, initials, logout } = useAuth();

const isDrawerOpen = ref(false);

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
  if (path.startsWith('/settings')) {
    return 'CONFIGURACIÓN';
  }
  return 'TENNIS STATS';
});

const isRouteActive = (paths: string[]) => {
  return paths.includes(route.path);
};

const handleNavigateToSettings = () => {
  router.push('/settings');
};

const handleSignOut = async () => {
  isDrawerOpen.value = false;
  await logout();
};
</script>
