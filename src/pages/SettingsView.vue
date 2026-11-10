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
              <span>Configuración</span>
              <span class="sr-only">Ajustes & Servicios</span>
            </h2>
            <p class="text-xs sm:text-sm text-on-surface-variant">
              Personaliza tu experiencia de análisis, tema y sincronización con sensores.
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
              <h3 class="font-bold text-base text-on-surface">Apariencia del Tema</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
              {{ isDark ? 'Modo Oscuro' : 'Modo Claro' }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            Selecciona la paleta visual optimizada según el entorno o las condiciones de luz en cancha.
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
              <span>Modo Claro</span>
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
              <span>Modo Oscuro</span>
            </button>
          </div>
        </div>

        <!-- Language Selector (i18n) -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">language</span>
              <h3 class="font-bold text-base text-on-surface">Idioma / Language</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase">
              {{ locale }}
            </span>
          </div>

          <p class="text-xs text-on-surface-variant">
            Cambia instantáneamente el idioma de visualización de la interfaz.
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
              <span>Español</span>
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
              <span>English</span>
            </button>
          </div>
        </div>

        <!-- Health Connect & Wear OS Integration -->
        <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl border border-outline space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-icons-round text-primary text-xl">favorite</span>
              <h3 class="font-bold text-base text-on-surface">Health Connect & Wear OS</h3>
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Conectado</span>
            </span>
          </div>

          <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Sincronización activa de frecuencia cardíaca continua, consumo calórico y conteo de pasos durante cada partido registrado desde tu smartwatch Wear OS con la app oficial Tennis Stats.
          </p>

          <div class="pt-2">
            <button 
              type="button"
              @click="triggerNativeSettings"
              class="btn-primary w-full text-xs sm:text-sm gap-2"
            >
              <span class="material-icons-round text-base">tune</span>
              <span>Abrir Ajustes Nativos</span>
            </button>
          </div>
        </div>

        <!-- Version & Build Info -->
        <div class="glass-panel bg-surface text-on-surface p-4 sm:p-5 rounded-2xl border border-outline flex items-center justify-between text-xs shadow-sm">
          <div class="flex items-center gap-2 text-on-surface-variant">
            <span class="material-icons-round text-base">info</span>
            <span>Versión del Dashboard</span>
          </div>
          <span class="font-bold text-on-surface">v1.4.0 (Material 3 Wimbledon Emerald)</span>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { applyTheme, toggleTheme, isDark, type ThemeMode } from '@/shared/services/theme';
import { useI18n, type Locale } from '@/shared/i18n';
import { useSnackbar } from '@/shared/composables/useSnackbar';

const router = useRouter();
const { locale, setLocale } = useI18n();
const snackbar = useSnackbar();

const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/');
  }
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
  snackbar.info(newLocale === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English');
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
  snackbar.info('Ajustes nativos disponibles en la app complementaria.');
};
</script>
