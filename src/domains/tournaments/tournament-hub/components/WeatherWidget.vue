<template>
  <div class="glass-panel bg-surface text-on-surface p-6 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between">
    <div class="absolute top-0 right-0 p-4 opacity-10">
      <span class="material-icons-round text-8xl text-primary">wb_sunny</span>
    </div>
    
    <div class="relative z-10">
      <h3 class="font-semibold text-xs text-on-surface-variant uppercase tracking-wider flex items-center gap-2 mb-3">
        <span class="material-icons-round text-sm text-primary">cloud</span>
        Condiciones de Cancha
      </h3>
      
      <div class="flex items-end gap-1.5 text-on-surface">
        <span class="text-4xl font-display font-bold leading-none">24°</span>
        <span class="text-lg font-medium mb-0.5 text-on-surface-variant">C</span>
      </div>
      <p class="text-on-surface-variant mt-1 font-medium text-sm">Despejado, Viento Leve</p>
    </div>
    
    <div class="relative z-10 grid grid-cols-2 gap-4 mt-4 border-t border-outline-variant pt-3">
      <div>
        <div class="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Humedad</div>
        <div class="font-bold text-base text-on-surface">45%</div>
      </div>
      <div>
        <div class="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Viento</div>
        <div class="font-bold text-base text-on-surface">12 <span class="text-xs font-normal text-on-surface-variant">km/h</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
