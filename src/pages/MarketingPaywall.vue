<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { isRunningInWebView } from '@/shared/services/firebase';

const isWebView = isRunningInWebView();

const slides = [
  {
    icon: 'insights',
    badge: 'Análisis Táctico',
    title: 'Estadísticas profundas de tus partidos',
    description: 'Desglose exacto de puntos ganados al servicio, quiebres concretados, efectividad en momentos de presión y rendimiento set a set.',
    gradient: 'from-blue-600/20 to-indigo-600/20',
    accentColor: 'text-blue-500',
    borderColor: 'border-blue-500/30',
    features: [
      'Porcentajes de puntos ganados sirviendo y recibiendo',
      'Break points convertidos vs defendidos',
      'Historial completo de marcadores y tiebreaks'
    ]
  },
  {
    icon: 'favorite',
    badge: 'Salud & Cardio',
    title: 'Ritmo cardíaco y desgaste físico',
    description: 'Monitoreo en tiempo real de tu frecuencia cardíaca, calorías quemadas y pasos durante el partido, con sincronización automática a Google Health y Samsung Health.',
    gradient: 'from-rose-600/20 to-orange-600/20',
    accentColor: 'text-rose-500',
    borderColor: 'border-rose-500/30',
    features: [
      'BPM promedio y máximo durante el encuentro',
      'Calorías activas y pasos totales',
      'Integración nativa con Health Connect / Fitbit'
    ]
  },
  {
    icon: 'emoji_events',
    badge: 'Scouting & Torneos',
    title: 'Historial cara a cara y llaves de torneos',
    description: 'Analizá tu historial contra cada rival frecuente, identificá patrones ganadores y administrá tus cuadros de torneos oficiales o amistosos.',
    gradient: 'from-amber-600/20 to-yellow-600/20',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-500/30',
    features: [
      'Registro Head-to-Head contra cada contrincante',
      'Cuadros eliminatorios y rondas de torneo',
      'Rachas de sets ganados consecutivos'
    ]
  },
  {
    icon: 'watch',
    badge: 'Ecosistema Wear OS',
    title: 'Anotá con tu reloj y sincronizá sin esfuerzo',
    description: 'Llevá el tanteo punto a punto desde tu muñeca con un simple toque. Al terminar el partido, todo se envía directamente a tu teléfono y a la nube.',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    accentColor: 'text-emerald-500',
    borderColor: 'border-emerald-500/30',
    features: [
      'Scorekeeper táctil e intuitivo para Wear OS',
      'Modo offline completo durante el partido',
      'Transferencia automática sin gastar batería de más'
    ]
  }
];

const currentSlide = ref(0);
let autoAdvanceTimer: any = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetTimer();
};

const startTimer = () => {
  autoAdvanceTimer = setInterval(nextSlide, 5000);
};

const resetTimer = () => {
  if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
  startTimer();
};

const pauseTimer = () => {
  if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
};

const resumeTimer = () => {
  resetTimer();
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
});

const handleSubscribe = () => {
  if (typeof window !== 'undefined' && (window as any).flutter_inappwebview?.callHandler) {
    (window as any).flutter_inappwebview.callHandler('openNativePaywall').catch((e: any) => {
      console.warn('Could not open native paywall:', e);
    });
  }
};
</script>

<template>
  <div class="min-h-full py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
    <!-- Header Hero -->
    <div class="text-center space-y-3 max-w-2xl">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
        <span class="material-icons-round text-sm">workspace_premium</span>
        Tennis Stats Pro
      </div>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-on-surface">
        El centro de control definitivo para tu tenis
      </h1>
      <p class="text-sm sm:text-base text-on-surface-variant">
        Accedé a estadísticas de nivel profesional, mapas de rendimiento, métricas cardíacas y sincronización automática entre tu reloj y la nube.
      </p>
    </div>

    <!-- Explanatory Carousel -->
    <div class="w-full mt-8 relative" @mouseenter="pauseTimer" @mouseleave="resumeTimer">
      <div class="overflow-hidden rounded-2xl bg-surface border border-outline-variant shadow-lg">
        <div class="relative min-h-[340px] sm:min-h-[280px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300">
          <!-- Background Ambient Gradient -->
          <div 
            class="absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none transition-colors duration-500"
            :class="slides[currentSlide]?.gradient"
          />

          <!-- Slide Content -->
          <div class="relative z-10 space-y-4">
            <div class="flex items-center justify-between">
              <span 
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-surface/80 border backdrop-blur-xs"
                :class="[slides[currentSlide]?.accentColor, slides[currentSlide]?.borderColor]"
              >
                <span class="material-icons-round text-base">{{ slides[currentSlide]?.icon }}</span>
                {{ slides[currentSlide]?.badge }}
              </span>
              <span class="text-xs font-mono text-on-surface-variant">
                {{ currentSlide + 1 }} / {{ slides.length }}
              </span>
            </div>

            <h2 class="text-xl sm:text-2xl font-bold text-on-surface">
              {{ slides[currentSlide]?.title }}
            </h2>

            <p class="text-sm text-on-surface-variant leading-relaxed">
              {{ slides[currentSlide]?.description }}
            </p>

            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <li 
                v-for="(f, i) in slides[currentSlide]?.features" 
                :key="i"
                class="flex items-start gap-2 p-2.5 rounded-xl bg-surface/60 border border-outline-variant/60 text-xs font-medium text-on-surface backdrop-blur-xs"
              >
                <span class="material-icons-round text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                <span>{{ f }}</span>
              </li>
            </ul>
          </div>

          <!-- Carousel Controls -->
          <div class="relative z-10 pt-6 flex items-center justify-between border-t border-outline-variant/50">
            <button 
              @click="prevSlide" 
              class="p-2 rounded-xl bg-surface border border-outline-variant hover:bg-surface-variant text-on-surface transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label="Anterior"
            >
              <span class="material-icons-round text-lg">arrow_back</span>
            </button>

            <!-- Dots Indicator -->
            <div class="flex items-center gap-2">
              <button
                v-for="(_, idx) in slides"
                :key="idx"
                @click="goToSlide(idx)"
                class="h-2 rounded-full transition-all duration-300"
                :class="idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-outline-variant hover:bg-outline'"
                :aria-label="`Ir a diapositiva ${idx + 1}`"
              />
            </div>

            <button 
              @click="nextSlide" 
              class="p-2 rounded-xl bg-surface border border-outline-variant hover:bg-surface-variant text-on-surface transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label="Siguiente"
            >
              <span class="material-icons-round text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Banner -->
    <div class="w-full mt-8 p-6 sm:p-8 rounded-2xl bg-surface border border-primary/30 shadow-md text-center space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-primary text-on-primary mx-auto flex items-center justify-center shadow-md">
        <span class="material-icons-round text-2xl">star</span>
      </div>

      <div class="space-y-1">
        <h3 class="text-lg sm:text-xl font-bold text-on-surface">
          Activá tu suscripción y desbloqueá el historial completo
        </h3>
        <p class="text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto">
          Los partidos que juegues con tu reloj se sincronizarán automáticamente y podrás consultarlos desde cualquier dispositivo.
        </p>
      </div>

      <!-- Action Button for Mobile App (InAppWebView) -->
      <div v-if="isWebView" class="pt-2">
        <button
          type="button"
          @click="handleSubscribe"
          class="px-8 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm sm:text-base hover:bg-primary/90 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mx-auto"
        >
          <span class="material-icons-round text-lg">play_arrow</span>
          Suscribirme con Google Play
        </button>
      </div>

      <!-- Instruction for Desktop Web Browser -->
      <div v-else class="pt-2 max-w-md mx-auto">
        <div class="p-4 rounded-xl bg-surface-variant border border-outline-variant text-xs text-on-surface-variant space-y-2">
          <div class="flex items-center justify-center gap-1.5 font-bold text-on-surface text-sm">
            <span class="material-icons-round text-base text-primary">smartphone</span>
            Disponible en Google Play
          </div>
          <p>
            Descargá la aplicación <strong>Tennis Stats</strong> en tu teléfono Android desde Google Play Store y suscribite con tu misma cuenta de Google. Tu acceso se activará en esta pantalla de inmediato.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
