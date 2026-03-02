<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 text-white w-full">
    <h1 class="text-4xl font-bold mb-8">Tennis Pro App Navigation</h1>
    <div class="flex flex-col gap-4 w-full max-w-md">
      <router-link to="/kit-bag" class="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-3 px-6 rounded-lg text-center transition-colors">
        The Kit Bag (Equipment)
      </router-link>
      <router-link to="/analytics" class="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-3 px-6 rounded-lg text-center transition-colors">
        Match Analytics
      </router-link>
      <router-link to="/tournament" class="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-3 px-6 rounded-lg text-center transition-colors">
        Tournament Hub
      </router-link>
      <router-link to="/scouting" class="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-3 px-6 rounded-lg text-center transition-colors">
        Scouting Report
      </router-link>
    </div>
  </div>
</template>