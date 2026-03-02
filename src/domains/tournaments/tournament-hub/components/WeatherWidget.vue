<template>
  <div class="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 p-6 rounded-2xl relative overflow-hidden text-white shadow-lg h-full flex flex-col justify-between">
    <div class="absolute top-0 right-0 p-4 opacity-20">
      <span class="material-icons-round text-8xl">wb_sunny</span>
    </div>
    
    <div class="relative z-10">
      <h3 class="font-semibold text-sm text-cyan-100 uppercase tracking-wider flex items-center gap-2 mb-4">
        <span class="material-icons-round text-sm">cloud</span>
        Court Conditions
      </h3>
      
      <div class="flex items-end gap-2 text-white">
        <span class="text-5xl font-display font-bold leading-none">24°</span>
        <span class="text-xl font-medium mb-1">C</span>
      </div>
      <p class="text-cyan-100 mt-1 font-medium text-lg">Sunny, Low Wind</p>
    </div>
    
    <div class="relative z-10 grid grid-cols-2 gap-4 mt-6 border-t border-white/20 pt-4">
      <div>
        <div class="text-[10px] text-cyan-200 uppercase tracking-wider font-bold mb-1">Humidity</div>
        <div class="font-bold text-lg">45%</div>
      </div>
      <div>
        <div class="text-[10px] text-cyan-200 uppercase tracking-wider font-bold mb-1">Wind</div>
        <div class="font-bold text-lg">12 <span class="text-xs font-normal">km/h</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This could take props for weather data, using static for demo
</script>
