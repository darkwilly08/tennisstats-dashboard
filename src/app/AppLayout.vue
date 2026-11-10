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

        <!-- Right: Auth Action & Settings -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- Google Sign-In Action (When unauthenticated) -->
          <button
            v-if="!isAuthenticated"
            type="button"
            @click="handleSignIn"
            :disabled="isLoggingIn"
            aria-label="Iniciar sesión con Google"
            title="Iniciar sesión con Google"
            class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-outline hover:bg-surface-variant text-on-surface text-xs sm:text-sm font-semibold transition-all shadow-sm min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
          >
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span class="hidden sm:inline">{{ isLoggingIn ? t('auth.loggingIn', 'Iniciando...') : t('auth.login', 'Iniciar Sesión') }}</span>
          </button>

          <!-- Desktop User Avatar Chip (When authenticated) -->
          <button
            v-else-if="isAuthenticated && !isWebView"
            type="button"
            @click="isDrawerOpen = true"
            :aria-label="displayName || 'Usuario'"
            :title="displayName || 'Usuario'"
            class="hidden sm:flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-surface-variant transition-colors border border-outline/50 min-h-[40px]"
          >
            <img
              v-if="user?.photoURL"
              :src="user.photoURL"
              class="w-7 h-7 rounded-full object-cover border border-outline shadow-xs"
              alt="Avatar"
              referrerpolicy="no-referrer"
            />
            <div
              v-else
              class="w-7 h-7 rounded-full bg-primary-container text-on-primary-container text-xs font-bold flex items-center justify-center border border-outline shadow-xs"
            >
              {{ initials }}
            </div>
            <span class="text-xs font-semibold text-on-surface max-w-[120px] truncate">
              {{ displayName }}
            </span>
          </button>

          <!-- Clean Settings Direct Route (No intermediate modal) -->
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

        <!-- Authenticated Profile -->
        <div v-if="isAuthenticated" class="flex items-center gap-3.5 pt-1">
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

        <!-- Unauthenticated Guest Profile with Action -->
        <div v-else class="space-y-3 pt-1">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0 border border-outline">
              <span class="material-icons-round text-2xl">person_outline</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="font-bold text-on-surface truncate text-base leading-snug">
                {{ t('auth.guest', 'Invitado') }}
              </div>
              <div class="text-xs text-on-surface-variant truncate">
                {{ isWebView ? t('auth.mobileSessionNotice', 'Sesión administrada por la app móvil') : t('auth.notLoggedIn', 'Sin sesión activa') }}
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="handleSignIn"
            :disabled="isLoggingIn"
            aria-label="Iniciar sesión con Google"
            class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold shadow-sm hover:bg-primary/90 transition-all active:scale-98 disabled:opacity-60"
          >
            <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>{{ isLoggingIn ? t('auth.loggingIn', 'Iniciando sesión...') : t('auth.loginWithGoogle', 'Iniciar sesión con Google') }}</span>
          </button>
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
          <span>{{ t('nav.analytics', 'Estadísticas de Partidos') }}</span>
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
          <span>{{ t('nav.tournaments', 'Torneos') }}</span>
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
          <span>{{ t('nav.kitBag', 'Kit Bag / Equipamiento') }}</span>
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
          <span>{{ t('nav.scouting', 'Rivales & Scouting') }}</span>
        </router-link>

        <router-link 
          to="/settings"
          @click="isDrawerOpen = false"
          role="button"
          :aria-label="t('nav.settings', 'Configuración & Health Connect')"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[48px]"
          :class="isRouteActive(['/settings']) 
            ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
            : 'text-on-surface hover:bg-surface-variant'"
        >
          <span class="material-icons-round text-xl">settings</span>
          <span>{{ t('nav.settingsShort', 'Configuración') }}</span>
        </router-link>
      </nav>

      <!-- Bottom Drawer Footer: Logout or Google Sign-In -->
      <div class="p-4 border-t border-outline-variant space-y-2">
        <!-- If Authenticated: Logout Button -->
        <button 
          v-if="isAuthenticated"
          @click="handleSignOut"
          :aria-label="t('nav.logout', 'Cerrar Sesión')"
          class="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs sm:text-sm font-semibold min-h-[44px]"
        >
          <span class="material-icons-round text-lg">logout</span>
          <span>{{ t('nav.logout', 'Cerrar Sesión') }}</span>
        </button>

        <!-- If Not Authenticated: Google Sign-In Button -->
        <button
          v-else
          @click="handleSignIn"
          :disabled="isLoggingIn"
          :aria-label="t('auth.loginWithGoogle', 'Iniciar sesión con Google')"
          class="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-surface border border-outline hover:bg-surface-variant text-on-surface transition-all text-xs sm:text-sm font-semibold shadow-sm min-h-[44px] disabled:opacity-60"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span v-if="!isLoggingIn">{{ t('auth.loginWithGoogle', 'Iniciar sesión con Google') }}</span>
          <span v-else>{{ t('auth.loggingIn', 'Iniciando sesión...') }}</span>
        </button>
      </div>
    </aside>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { useI18n } from '@/shared/i18n';
import { useSnackbar } from '@/shared/composables/useSnackbar';
import SnackbarContainer from '@/shared/components/SnackbarContainer.vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const snackbar = useSnackbar();
const { 
  user, 
  isAuthenticated, 
  isWebView, 
  isLoggingIn, 
  displayName, 
  email, 
  initials, 
  loginWithGoogle, 
  logout 
} = useAuth();

const isDrawerOpen = ref(false);

const activePageTitle = computed(() => {
  const path = route.path;
  if (path === '/' || path.startsWith('/analytics')) {
    return t('header.analytics', 'MATCH ANALYTICS');
  }
  if (path.startsWith('/tournament')) {
    return t('header.tournaments', 'TOURNAMENT HUB');
  }
  if (path.startsWith('/kit-bag')) {
    return t('header.kitBag', 'THE KIT BAG');
  }
  if (path.startsWith('/scouting')) {
    return t('header.scouting', 'SCOUTING REPORT');
  }
  if (path.startsWith('/settings')) {
    return t('header.settings', 'CONFIGURACIÓN');
  }
  return 'TENNIS STATS';
});

const isRouteActive = (paths: string[]) => {
  return paths.includes(route.path);
};

const handleNavigateToSettings = () => {
  router.push('/settings');
};

const handleSignIn = async () => {
  try {
    const success = await loginWithGoogle();
    if (success) {
      snackbar.success(t('auth.loginSuccess', 'Sesión iniciada con éxito'));
    }
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
      snackbar.error(t('auth.loginError', 'Error al iniciar sesión con Google'));
    }
  }
};

const handleSignOut = async () => {
  isDrawerOpen.value = false;
  await logout();
  snackbar.info(t('auth.loggedOut', 'Sesión cerrada'));
};
</script>
