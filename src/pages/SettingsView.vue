<template>
  <div class="bg-background text-on-surface min-h-screen">
    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      
      <!-- Top Title and Back Action -->
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="handleGoBack"
            aria-label="Volver"
            class="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <span class="material-icons-round text-xl">arrow_back</span>
          </button>
          <div>
            <h2 class="text-xl sm:text-2xl font-display font-bold text-on-surface flex items-center gap-2">
              <span>{{ t('settings.title', 'Configuración') }}</span>
              <span class="sr-only">Ajustes & Servicios</span>
            </h2>
            <p class="text-xs sm:text-sm text-on-surface-variant">
              {{ t('settings.subtitle', 'Personaliza tu experiencia de análisis, tema y sincronización con sensores.') }}
            </p>
          </div>
        </div>

        <div class="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
          <span class="material-icons-round text-2xl">tune</span>
        </div>
      </div>

      <!-- Settings Cards Grid -->
      <div class="space-y-5">
        
        <!-- Appearance & Theme -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">
                {{ isDark ? 'dark_mode' : 'light_mode' }}
              </span>
              <h3 class="font-bold text-base text-on-surface">{{ t('settings.appearance', 'Apariencia del Tema') }}</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
              {{ isDark ? t('settings.darkMode', 'Modo Oscuro') : t('settings.lightMode', 'Modo Claro') }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            {{ t('settings.appearanceDesc', 'Selecciona la paleta visual optimizada según el entorno o las condiciones de luz en cancha.') }}
          </p>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              @click="setThemeMode('light')"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[48px]"
              :class="!isDark 
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold' 
                : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
            >
              <span class="material-icons-round text-lg">light_mode</span>
              <span>{{ t('settings.lightMode', 'Modo Claro') }}</span>
            </button>

            <button
              type="button"
              @click="setThemeMode('dark')"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[48px]"
              :class="isDark 
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold' 
                : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
            >
              <span class="material-icons-round text-lg">dark_mode</span>
              <span>{{ t('settings.darkMode', 'Modo Oscuro') }}</span>
            </button>
          </div>
        </div>

        <!-- Language Selector (i18n) -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">language</span>
              <h3 class="font-bold text-base text-on-surface">{{ t('settings.language', 'Idioma / Language') }}</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase">
              {{ locale }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            {{ t('settings.languageDesc', 'Cambia instantáneamente el idioma de visualización de la interfaz.') }}
          </p>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              @click="handleSetLocale('es')"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[48px]"
              :class="locale === 'es' 
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold' 
                : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
            >
              <span class="text-base">🇪🇸</span>
              <span>{{ t('settings.spanish', 'Español') }}</span>
            </button>

            <button
              type="button"
              @click="handleSetLocale('en')"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all min-h-[48px]"
              :class="locale === 'en' 
                ? 'bg-primary text-on-primary border-primary shadow-sm font-bold' 
                : 'bg-surface text-on-surface border-outline hover:bg-surface-variant'"
            >
              <span class="text-base">🇬🇧</span>
              <span>{{ t('settings.english', 'English') }}</span>
            </button>
          </div>
        </div>

        <!-- Health Connect & Wear OS Integration -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">favorite</span>
              <h3 class="font-bold text-base text-on-surface">{{ t('settings.healthConnectTitle', 'Health Connect & Wear OS') }}</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{{ t('settings.statusConnected', 'Conectado') }}<span class="sr-only">Conectado</span></span>
            </span>
          </div>

          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            {{ t('settings.healthConnectDesc', 'Sincronización activa de frecuencia cardíaca continua, consumo calórico y conteo de pasos durante cada partido registrado desde tu smartwatch Wear OS con la app oficial Tennis Stats.') }}
          </p>

          <div class="pt-2">
            <button 
              type="button"
              @click="triggerNativeSettings"
              class="btn-primary w-full text-xs sm:text-sm gap-2"
            >
              <span class="material-icons-round text-base">tune</span>
              <span>{{ t('settings.openNativeSettings', 'Abrir Ajustes Nativos') }}</span>
            </button>
          </div>
        </div>

        <!-- Account & Session Management -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">account_circle</span>
              <h3 class="font-bold text-base text-on-surface">{{ t('settings.account', 'Cuenta & Sesión') }}</h3>
            </div>
            <span 
              class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              :class="isAuthenticated ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-surface-variant text-on-surface-variant'"
            >
              {{ isAuthenticated ? t('settings.accountConnected', 'Sesión Activa') : t('settings.accountGuest', 'Invitado') }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            {{ t('settings.accountDesc', 'Gestiona tu sesión de usuario para sincronizar partidos, torneos y equipamiento en la nube.') }}
          </p>

          <!-- Authenticated State -->
          <div v-if="isAuthenticated" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-variant/60 border border-outline-variant">
            <div class="flex items-center gap-3.5 min-w-0">
              <img
                v-if="photoURL"
                :src="photoURL"
                class="w-11 h-11 rounded-full object-cover border border-outline shrink-0 shadow-sm"
                alt="Profile"
                referrerpolicy="no-referrer"
              />
              <div
                v-else
                class="w-11 h-11 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center shrink-0 border border-outline text-sm shadow-sm"
              >
                {{ initials }}
              </div>
              <div class="min-w-0">
                <div class="font-bold text-sm text-on-surface truncate">{{ displayName }}</div>
                <div class="text-xs text-on-surface-variant truncate">{{ email }}</div>
              </div>
            </div>

            <button
              type="button"
              @click="handleSignOut"
              class="px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs sm:text-sm font-semibold transition-colors shrink-0 flex items-center justify-center gap-2 min-h-[40px]"
            >
              <span class="material-icons-round text-base">logout</span>
              <span>{{ t('nav.logout', 'Cerrar Sesión') }}</span>
            </button>
          </div>

          <!-- Unauthenticated State (Unified for Web & WebView) -->
          <div v-else class="space-y-3 pt-1">
            <button
              type="button"
              @click="handleSignIn"
              :disabled="isLoggingIn"
              class="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-primary text-on-primary hover:bg-primary/90 transition-all text-xs sm:text-sm font-semibold shadow-sm min-h-[48px] disabled:opacity-60"
            >
              <svg class="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span v-if="!isLoggingIn">{{ t('auth.loginWithGoogle', 'Iniciar sesión con Google') }}</span>
              <span v-else>{{ t('auth.loggingIn', 'Iniciando sesión...') }}</span>
            </button>

            <div v-if="isWebView" class="text-xs text-on-surface-variant p-2.5 rounded-xl bg-surface-variant/40 border border-outline-variant flex items-center gap-2">
              <span class="material-icons-round text-primary text-base">smartphone</span>
              <span>{{ t('auth.mobileSessionNotice', 'Sesión administrada por la app móvil') }}</span>
            </div>
          </div>
        </div>

        <!-- Subscription & Developer Bypass Management -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">workspace_premium</span>
              <h3 class="font-bold text-base text-on-surface">Suscripción & Acceso PRO</h3>
            </div>
            <span 
              class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              :class="isUserSubscribed ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' : 'bg-surface-variant text-on-surface-variant'"
            >
              {{ isUserSubscribed ? 'PRO Activo' : 'Versión Estándar' }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            {{ isUserSubscribed 
                ? 'Tenés acceso ilimitado al historial completo de partidos, sincronización automática desde tu reloj y métricas cardíacas avanzadas.' 
                : 'Activá tu suscripción en Google Play o habilita el modo de pruebas para desbloquear todas las funciones del dashboard.' }}
          </p>

          <div class="p-4 rounded-xl bg-surface-variant/40 border border-outline-variant space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="font-bold text-xs sm:text-sm text-on-surface">Bypass de Suscripción PRO (Desarrollador)</div>
                <div class="text-[11px] sm:text-xs text-on-surface-variant mt-0.5">
                  Permite probar el dashboard completo y omitir el paywall sin requerir Google Play en este dispositivo.
                </div>
              </div>
              <button
                type="button"
                @click="toggleSubBypass"
                class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-2 shadow-xs"
                :class="isBypassActive 
                  ? 'bg-rose-600 text-white hover:bg-rose-700' 
                  : 'bg-primary text-on-primary hover:bg-primary/90'"
              >
                <span class="material-icons-round text-base">{{ isBypassActive ? 'lock' : 'lock_open' }}</span>
                <span>{{ isBypassActive ? 'Desactivar Bypass' : 'Activar Bypass PRO' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Version & Build Info -->
        <div class="glass-panel bg-surface text-on-surface p-4 sm:p-5 rounded-2xl border border-outline flex items-center justify-between text-xs shadow-sm">
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-icons-round text-base">info</span>
            <span>{{ t('settings.versionTitle', 'Versión del Dashboard') }}</span>
          </div>
          <span class="font-bold text-on-surface">{{ t('settings.versionBadge', 'v1.4.0 (Material Design 3)') }}</span>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { applyTheme, toggleTheme, isDark, type ThemeMode } from '@/shared/services/theme';
import { useI18n, type Locale } from '@/shared/i18n';
import { useSnackbar } from '@/shared/composables/useSnackbar';
import { useAuth } from '@/shared/composables/useAuth';
import { 
  isUserSubscribed, 
  isDevSubscriptionBypassEnabled, 
  setDevSubscriptionBypass 
} from '@/shared/services/firebase';

const router = useRouter();
const { locale, setLocale, t } = useI18n();
const snackbar = useSnackbar();
const { 
  isAuthenticated, 
  isWebView, 
  isLoggingIn, 
  displayName, 
  email, 
  photoURL, 
  initials, 
  loginWithGoogle, 
  logout 
} = useAuth();

const isBypassActive = ref(isDevSubscriptionBypassEnabled());

const toggleSubBypass = () => {
  const next = !isBypassActive.value;
  setDevSubscriptionBypass(next);
  isBypassActive.value = next;
  snackbar.success(next ? 'Bypass PRO activado con éxito' : 'Bypass PRO desactivado');
};

const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
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
  await logout();
  snackbar.info(t('auth.loggedOut', 'Sesión cerrada'));
};

const setThemeMode = (mode: ThemeMode) => {
  if ((mode === 'dark') !== isDark.value) {
    toggleTheme();
  } else {
    applyTheme(mode);
  }
};

const handleSetLocale = (newLocale: Locale) => {
  setLocale(newLocale);
  snackbar.info(newLocale === 'es' ? t('settings.langChangedEs', 'Idioma cambiado a Español') : t('settings.langChangedEn', 'Language changed to English'));
};

const triggerNativeSettings = async () => {
  if (window.flutter_inappwebview?.callHandler) {
    try {
      await window.flutter_inappwebview.callHandler('openNativeSettings');
      return;
    } catch (e) {
      console.warn('Native openNativeSettings failed:', e);
    }
  }
  snackbar.info(t('settings.nativeAvailable', 'Ajustes nativos disponibles en la app complementaria.'));
};
</script>
