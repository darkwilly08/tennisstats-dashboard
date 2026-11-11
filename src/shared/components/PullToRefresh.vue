<template>
  <div 
    class="pull-to-refresh-container relative min-h-full"
    @touchstart.passive="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @touchcancel="handleTouchCancel"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @pointercancel="handlePointerCancel"
  >
    <!-- Floating Pull-To-Refresh Indicator Badge -->
    <div 
      class="fixed left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all"
      :class="isDragging ? 'duration-75 ease-out' : 'duration-300 ease-out'"
      :style="{
        top: 'calc(var(--safe-area-top, env(safe-area-inset-top, 0px)) + 3.8rem)',
        transform: `translate3d(-50%, ${indicatorTranslateY}px, 0) scale(${indicatorScale})`,
        opacity: indicatorOpacity
      }"
    >
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border transition-all"
        :class="isReadyToRefresh || isRefreshing 
          ? 'bg-primary text-on-primary border-primary ring-2 ring-primary/30' 
          : 'bg-surface text-primary border-outline/70'"
      >
        <span 
          class="material-icons-round text-xl transition-transform"
          :class="{ 'animate-spin': isRefreshing }"
          :style="isRefreshing ? {} : { transform: `rotate(${iconRotation}deg)` }"
        >
          refresh
        </span>
      </div>
    </div>

    <!-- Content slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  onRefresh: () => Promise<void> | void;
  disabled?: boolean;
}>(), {
  disabled: false
});

const startY = ref(0);
const startX = ref(0);
const isTracking = ref(false);
const isDragging = ref(false);
const pullDistance = ref(0);
const isRefreshing = ref(false);

const THRESHOLD = 65;
const MAX_PULL = 90;

const isReadyToRefresh = computed(() => pullDistance.value >= THRESHOLD);

const indicatorTranslateY = computed(() => {
  if (isRefreshing.value) return 20;
  if (pullDistance.value <= 0) return -60;
  return Math.min(pullDistance.value * 0.7 - 20, 48);
});

const indicatorOpacity = computed(() => {
  if (isRefreshing.value) return 1;
  if (pullDistance.value <= 10) return 0;
  return Math.min((pullDistance.value - 10) / 35, 1);
});

const indicatorScale = computed(() => {
  if (isRefreshing.value) return 1;
  if (pullDistance.value <= 10) return 0.6;
  return Math.min(0.6 + (pullDistance.value / THRESHOLD) * 0.4, 1.1);
});

const iconRotation = computed(() => {
  return pullDistance.value * 4;
});

const isAtTopOfPage = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (window.scrollY || document.documentElement.scrollTop || 0) <= 0;
};

const isModalOpen = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.body.style.overflow === 'hidden';
};

// Touch Handlers
const handleTouchStart = (e: TouchEvent) => {
  if (props.disabled || isRefreshing.value || isModalOpen() || !isAtTopOfPage()) {
    isTracking.value = false;
    return;
  }
  const touch = e.touches[0];
  if (!touch) return;
  startY.value = touch.clientY;
  startX.value = touch.clientX;
  isTracking.value = true;
  isDragging.value = false;
  pullDistance.value = 0;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isTracking.value || isRefreshing.value || props.disabled || isModalOpen()) return;

  const touch = e.touches[0];
  if (!touch) return;
  const diffY = touch.clientY - startY.value;
  const diffX = touch.clientX - startX.value;

  // Only consider downwards pull when at the top of the viewport
  if (diffY > 0 && Math.abs(diffY) > Math.abs(diffX) && isAtTopOfPage()) {
    isDragging.value = true;
    // Rubber banding damping
    pullDistance.value = Math.min(Math.pow(diffY, 0.8) * 1.6, MAX_PULL);
    if (pullDistance.value > 15 && e.cancelable) {
      e.preventDefault();
    }
  } else if (diffY < 0) {
    pullDistance.value = 0;
    isDragging.value = false;
  }
};

const handleTouchEnd = async () => {
  if (!isTracking.value) return;
  isTracking.value = false;
  isDragging.value = false;

  if (isReadyToRefresh.value && !isRefreshing.value) {
    await triggerRefresh();
  } else {
    pullDistance.value = 0;
  }
};

const handleTouchCancel = () => {
  isTracking.value = false;
  isDragging.value = false;
  pullDistance.value = 0;
};

// Pointer Handlers for Mouse Drag support (e.g. testing in desktop browser)
let isPointerActive = false;

const handlePointerDown = (e: PointerEvent) => {
  if (e.pointerType === 'touch') return; // Handled by touch events
  if (e.button !== 0) return; // Only primary mouse button
  if (props.disabled || isRefreshing.value || isModalOpen() || !isAtTopOfPage()) return;

  startY.value = e.clientY;
  startX.value = e.clientX;
  isPointerActive = true;
  isDragging.value = false;
  pullDistance.value = 0;
};

const handlePointerMove = (e: PointerEvent) => {
  if (!isPointerActive || isRefreshing.value || props.disabled || isModalOpen()) return;

  const diffY = e.clientY - startY.value;
  const diffX = e.clientX - startX.value;

  if (diffY > 8 && Math.abs(diffY) > Math.abs(diffX) && isAtTopOfPage()) {
    isDragging.value = true;
    pullDistance.value = Math.min(Math.pow(diffY, 0.8) * 1.6, MAX_PULL);
  }
};

const handlePointerUp = async () => {
  if (!isPointerActive) return;
  isPointerActive = false;
  isDragging.value = false;

  if (isReadyToRefresh.value && !isRefreshing.value) {
    await triggerRefresh();
  } else {
    pullDistance.value = 0;
  }
};

const handlePointerCancel = () => {
  isPointerActive = false;
  isDragging.value = false;
  pullDistance.value = 0;
};

const triggerRefresh = async () => {
  isRefreshing.value = true;
  pullDistance.value = THRESHOLD;
  const minDelay = new Promise(resolve => setTimeout(resolve, 600));

  try {
    await Promise.all([
      props.onRefresh(),
      minDelay
    ]);
  } catch (err) {
    console.warn('[PullToRefresh] Refresh failed:', err);
  } finally {
    isRefreshing.value = false;
    pullDistance.value = 0;
  }
};

onUnmounted(() => {
  isTracking.value = false;
  isPointerActive = false;
});
</script>
