<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased selection:bg-primary/30">
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <!-- Navigation -->
      <header class="flex items-center justify-between whitespace-nowrap border-b border-surface-dark bg-surface-darker px-10 py-3 sticky top-0 z-50">
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-4 text-white hover:opacity-80 transition-opacity">
            <div class="size-8 text-primary">
              <span class="material-symbols-outlined !text-[32px]">sports_tennis</span>
            </div>
            <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Tennis Tourney Hub</h2>
          </router-link>
          <nav class="hidden md:flex items-center gap-9">
            <a class="text-white hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Tournaments</a>
            <a class="text-white hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Rankings</a>
            <a class="text-white hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Players</a>
            <a class="text-white hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">News</a>
          </nav>
        </div>
        <div class="flex flex-1 justify-end gap-6 items-center">
          <label class="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
            <div class="flex w-full flex-1 items-stretch rounded-lg h-full group bg-surface-dark focus-within:ring-2 ring-primary/50 transition-all">
              <div class="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-500 px-4 rounded-l-none pl-2 text-sm font-normal leading-normal" placeholder="Search tournaments..." value=""/>
            </div>
          </label>
          <div class="flex items-center gap-4">
            <button class="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-background-dark text-sm font-bold hover:bg-primary/90 transition-colors">
              <span class="truncate">Sign In</span>
            </button>
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-surface-dark" data-alt="User profile picture" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9lfTWSpZt034ZV6CyCxdzWL2ioiXuhI0mm7ARj_xSQb-hkgtuz0B86jN7TeIRXmih3zUrx_-RtBNoRjScV32sHzLZIRXEd3ezz6mdFXk8gCUAjDD6hXKeQU5YvNgcWGxSz5NiREWOZvEp0QlyP9VmvzYWANoDdqbHibn0o-8-MJx9XSMOq-5b-CsZH06J7-Rhl7sr5nQekpd8XxCuAdW8yED2HZs2EiaY6TI8Gc5VYZk7sLPjQJhvRAInGo2FY6t-Tdm6ckvT2zw');"></div>
          </div>
        </div>
      </header>

      <main class="flex-1 flex flex-col items-center py-8 px-4 sm:px-8 lg:px-12">
        <div class="w-full max-w-7xl flex flex-col gap-8">
          
          <!-- Tournament Header -->
          <section class="relative overflow-hidden rounded-2xl bg-surface-darker border border-surface-dark shadow-xl">
            <!-- Background Image with Overlay -->
            <div class="absolute inset-0 z-0">
              <div class="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10"></div>
              <div class="w-full h-full bg-cover bg-center opacity-60" data-alt="Red clay tennis court stadium" data-location="Paris, France" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVb5S1JHFe1itNeCb5ljyGZVPtawZFnk_zSwV5XEXla1b3yO6YVwM6ZYnwOXmc6g-pqVfmX5CRk1qG2Yw935Hroluv-lQj78P406xnn8rSzpnjKWH5jUenO0HlNOKdM5YVkSoBBUY8aWrn1gq6c48RgmgGLi8pWYQZqquNOaTwAMOsh-V4c5XYE93uftZRrCjX1rgxlOtZH4eJci7ZHKQAjU1XWmvzx0Nak8SxU2WaaQCWvvibjNZJ9cMjxLHm10gMPnQpGx-ChiQ');"></div>
            </div>
            
            <div class="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 p-8 lg:p-10">
              <div class="flex flex-col gap-3 max-w-2xl">
                <div class="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                  <span class="bg-primary/10 px-2 py-1 rounded">ATP 1000</span>
                  <span class="text-slate-400">•</span>
                  <span>Grand Slam</span>
                </div>
                <h1 class="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">Roland Garros Club</h1>
                <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[20px]">location_on</span>
                    <span>Paris, France</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[20px]">grid_view</span>
                    <span>Red Clay Surface</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                    <span>May 26 - Jun 9</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-3 w-full md:w-auto">
                <button class="flex-1 md:flex-none h-11 px-6 rounded-lg bg-surface-dark hover:bg-surface-dark/80 text-white font-bold border border-slate-700 transition-colors flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[20px]">star</span>
                  <span>Follow</span>
                </button>
                <button class="flex-1 md:flex-none h-11 px-6 rounded-lg bg-primary hover:bg-primary/90 text-background-dark font-bold transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(13,185,242,0.3)]">
                  <span class="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Watch Live</span>
                </button>
              </div>
            </div>
          </section>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left Column: Bracket & Path (8 cols) -->
            <div class="lg:col-span-8 flex flex-col gap-6">
              
              <!-- Path Header -->
              <div class="flex items-center justify-between">
                <h2 class="text-white text-2xl font-bold tracking-tight">Your Path to Victory</h2>
                <span class="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Active Player</span>
              </div>
              
              <!-- Bracket Visualization -->
              <div class="bg-surface-darker border border-surface-dark rounded-xl p-6 overflow-x-auto">
                <div class="min-w-[700px] flex flex-col gap-6">
                  <!-- Quarter Finals -->
                  <div class="grid grid-cols-4 gap-4 relative">
                    <!-- Header Row -->
                    <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Round of 16</div>
                    <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Quarter-Finals</div>
                    <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 text-primary">Semi-Finals</div>
                    <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Finals</div>
                    
                    <!-- R16 Match -->
                    <div class="relative flex flex-col justify-center gap-1">
                      <div class="bg-surface-dark p-3 rounded-lg border-l-4 border-green-500 relative">
                        <div class="flex justify-between text-sm text-white font-medium">
                          <span>You</span>
                          <span class="text-green-400">W</span>
                        </div>
                        <div class="text-xs text-slate-400">6-4, 6-4</div>
                      </div>
                      <div class="absolute -right-4 top-1/2 w-4 h-[2px] bg-green-500"></div> <!-- Connector -->
                    </div>
                    
                    <!-- QF Match -->
                    <div class="relative flex flex-col justify-center">
                      <div class="bg-surface-dark p-3 rounded-lg border-l-4 border-green-500 relative mt-8">
                        <div class="text-xs text-slate-400 mb-1">vs Alcaraz <span class="text-primary font-bold">#1</span></div>
                        <div class="flex justify-between text-sm text-white font-medium">
                          <span>You</span>
                          <span class="text-green-400">W</span>
                        </div>
                        <div class="text-xs text-slate-400">7-6, 5-7, 6-2</div>
                        <!-- Incoming connector line logic visually simplified -->
                        <div class="absolute -left-4 top-1/2 w-4 h-[2px] bg-green-500"></div>
                        <div class="absolute -right-4 top-1/2 w-4 h-[2px] bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      </div>
                    </div>
                    
                    <!-- SF Match (Active) -->
                    <div class="relative flex flex-col justify-center">
                      <div class="bg-gradient-to-r from-surface-dark to-primary/10 p-4 rounded-lg border border-primary shadow-[0_0_15px_rgba(13,185,242,0.15)] relative mt-16">
                        <div class="absolute -top-3 right-3 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE</div>
                        <div class="flex items-center gap-2 mb-2">
                          <div class="size-2 rounded-full bg-primary animate-pulse"></div>
                          <span class="text-xs text-primary font-bold uppercase">Upcoming</span>
                        </div>
                        <div class="text-sm text-white font-bold mb-1">vs N. Djokovic <span class="text-slate-400 text-xs">#2</span></div>
                        <div class="text-xs text-slate-400">Court Philippe-Chatrier</div>
                        <div class="text-xs text-slate-400 mt-1">Today 14:00</div>
                        <!-- Connectors -->
                        <div class="absolute -left-4 top-1/2 w-4 h-[2px] bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        <div class="absolute -right-4 top-1/2 w-4 h-[2px] bg-slate-700"></div>
                      </div>
                    </div>
                    
                    <!-- Finals (Future) -->
                    <div class="relative flex flex-col justify-center">
                      <div class="bg-surface-dark/50 p-3 rounded-lg border border-surface-dark border-dashed relative mt-32 opacity-60">
                        <div class="text-xs text-slate-500 mb-1">vs TBD</div>
                        <div class="flex justify-between text-sm text-slate-300 font-medium">
                          <span>Final</span>
                        </div>
                        <div class="text-xs text-slate-600">Sun 15:00</div>
                        <div class="absolute -left-4 top-1/2 w-4 h-[2px] bg-slate-700"></div>
                      </div>
                    </div>

                    <!-- Decorational Grid Lines (simplified tree structure visualization) -->
                    <div class="absolute inset-0 pointer-events-none z-0">
                      <!-- Lines connecting R16 to QF -->
                      <div class="absolute left-[24%] top-[18%] bottom-[62%] border-r-2 border-slate-700 w-4 rounded-r-md"></div>
                      <!-- Lines connecting QF to SF -->
                      <div class="absolute left-[49%] top-[35%] bottom-[45%] border-r-2 border-slate-700 w-4 rounded-r-md"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Schedule List (Vertical) -->
              <div class="flex flex-col gap-4">
                <h3 class="text-white text-xl font-bold">Upcoming Matches</h3>
                <div class="flex flex-col gap-3">
                  <!-- Match Card 1 -->
                  <div class="bg-surface-dark hover:bg-surface-dark/80 transition-colors p-4 rounded-xl border-l-4 border-primary flex items-center justify-between group cursor-pointer">
                    <div class="flex items-center gap-6">
                      <div class="flex flex-col items-center justify-center w-12 text-center">
                        <span class="text-xs text-slate-400 font-bold uppercase">Today</span>
                        <span class="text-lg text-white font-bold">14:00</span>
                      </div>
                      <div class="h-10 w-[1px] bg-slate-700"></div>
                      <div>
                        <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Semi-Finals</div>
                        <div class="flex items-center gap-3">
                          <span class="text-white font-bold text-lg">Novak Djokovic</span>
                          <span class="bg-surface-darker text-xs text-slate-300 px-1.5 rounded border border-slate-700">#2</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="hidden sm:block text-right">
                        <div class="text-slate-300 text-sm">Court Philippe-Chatrier</div>
                        <div class="text-slate-500 text-xs">Capacity: 15,225</div>
                      </div>
                      <button class="size-10 rounded-full bg-surface-darker flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                        <span class="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  <!-- Match Card 2 -->
                  <div class="bg-surface-dark/50 p-4 rounded-xl border-l-4 border-slate-600 flex items-center justify-between opacity-70">
                    <div class="flex items-center gap-6">
                      <div class="flex flex-col items-center justify-center w-12 text-center">
                        <span class="text-xs text-slate-400 font-bold uppercase">Sun</span>
                        <span class="text-lg text-slate-200 font-bold">15:00</span>
                      </div>
                      <div class="h-10 w-[1px] bg-slate-700"></div>
                      <div>
                        <div class="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Finals</div>
                        <div class="flex items-center gap-3">
                          <span class="text-slate-200 font-bold text-lg">To Be Determined</span>
                        </div>
                      </div>
                    </div>
                    <div class="hidden sm:block text-right pr-4">
                      <div class="text-slate-400 text-sm">Center Court</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Stats & Info (4 cols) -->
            <div class="lg:col-span-4 flex flex-col gap-6">
              
              <!-- Pressure Stats Widget -->
              <div class="bg-surface-darker border border-surface-dark rounded-xl p-6">
                <div class="flex items-center gap-2 mb-6">
                  <span class="material-symbols-outlined text-primary">psychology</span>
                  <h3 class="text-white text-lg font-bold">Pressure Performance</h3>
                </div>
                
                <div class="space-y-6">
                  <!-- Stat 1 -->
                  <div>
                    <div class="flex justify-between items-end mb-2">
                      <span class="text-slate-400 text-sm font-medium">Break Points Saved</span>
                      <span class="text-white text-2xl font-bold">78%</span>
                    </div>
                    <div class="w-full bg-surface-dark rounded-full h-2 overflow-hidden mb-1">
                      <div class="bg-primary h-2 rounded-full" style="width: 78%"></div>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-slate-500">Tournament Avg: 62%</span>
                      <span class="text-green-400 font-bold">+16%</span>
                    </div>
                  </div>
                  
                  <!-- Stat 2 -->
                  <div>
                    <div class="flex justify-between items-end mb-2">
                      <span class="text-slate-400 text-sm font-medium">Tie-break Win %</span>
                      <span class="text-white text-2xl font-bold">100%</span>
                    </div>
                    <div class="w-full bg-surface-dark rounded-full h-2 overflow-hidden mb-1">
                      <div class="bg-primary h-2 rounded-full" style="width: 100%"></div>
                    </div>
                    <div class="flex justify-between text-xs">
                      <span class="text-slate-500">Historical Avg: 55%</span>
                      <span class="text-green-400 font-bold">+45%</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-surface-dark">
                  <div class="bg-surface-dark/50 p-4 rounded-lg">
                    <div class="flex items-start gap-3">
                      <span class="material-symbols-outlined text-yellow-500 mt-0.5">emoji_events</span>
                      <div>
                        <p class="text-white text-sm font-bold">Clutch Player Badge</p>
                        <p class="text-slate-400 text-xs mt-1">You are performing in the top 5% of players under pressure this week.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mini Map / Location Context -->
              <div class="bg-surface-darker border border-surface-dark rounded-xl overflow-hidden relative group">
                <div class="h-48 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Satellite map view of tennis complex" data-location="Stade Roland Garros" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8kHdPQAjH-oWUL6rdj79pJl8sJSOrC3B1jy_kJT5IeoQC5_f5IyF01vCsr3SOUgXHRcFNe0gPs-iu_EWOPNoEqJ5dd7caen_WyDqgoakO3f_WR_g3dBw6vBNs3DIHMGfH5w6X8wK2EtDtEvd8UjmBri0PfuUST3qAVHpkmqckeACxaIMPRsay_Dl1N8jdPp1gLzKxMNDHXvvk8nea1uLOBZYP-CzVkLbtar1ins4x5WVo3tEl_U7M3mTYoiRVHE9LbRbM73jCiq4');">
                  <div class="absolute inset-0 bg-gradient-to-t from-surface-darker via-transparent to-transparent"></div>
                </div>
                <div class="p-5 relative -mt-12">
                  <span class="bg-primary text-background-dark text-xs font-bold px-2 py-1 rounded mb-2 inline-block">Complex Map</span>
                  <h3 class="text-white text-lg font-bold">Stade Roland Garros</h3>
                  <p class="text-slate-400 text-sm mt-1">Navigate to practice courts and player lounge.</p>
                  
                  <button class="w-full mt-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm font-bold hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-[18px]">near_me</span>
                    Get Directions
                  </button>
                </div>
              </div>

              <!-- Weather Widget -->
              <div class="bg-gradient-to-br from-blue-900 to-surface-dark rounded-xl p-5 border border-blue-800/50">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-blue-200 text-xs font-bold uppercase">Court Conditions</p>
                    <h3 class="text-white text-2xl font-bold mt-1">Sunny</h3>
                    <p class="text-white/80 text-sm">Feels like 26°C</p>
                  </div>
                  <span class="material-symbols-outlined text-yellow-400 text-4xl">sunny</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-800/50">
                  <div>
                    <p class="text-blue-300 text-xs">Humidity</p>
                    <p class="text-white font-bold">45%</p>
                  </div>
                  <div>
                    <p class="text-blue-300 text-xs">Wind</p>
                    <p class="text-white font-bold">12 km/h NW</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tournament Hub Logic
</script>