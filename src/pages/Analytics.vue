<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
    <header class="sticky top-0 z-50 w-full px-6 py-4 glass-panel border-b border-gray-200 dark:border-slate-700/50">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="p-2 bg-primary-alt rounded-lg text-white shadow-glow">
            <span class="material-icons-round">sports_tennis</span>
          </div>
          <div>
            <h1 class="font-display text-2xl font-semibold tracking-wide uppercase">Match Analytics</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Player: Alex "Ace" Johnson</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-card-dark shadow-sm border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <span class="material-icons-round text-primary-alt">filter_list</span>
            <span class="text-sm font-medium">Filters</span>
          </button>
          <button class="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" @click="toggleDarkMode">
            <span class="material-icons-round dark:hidden">dark_mode</span>
            <span class="material-icons-round hidden dark:block">light_mode</span>
          </button>
          <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-alt to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
            AJ
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <!-- Top Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-icons-round text-6xl text-slate-400 dark:text-white">sports_tennis</span>
          </div>
          <div class="relative z-10">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Matches</p>
            <div class="flex items-baseline mt-2">
              <span class="text-4xl font-display font-bold">35</span>
              <span class="ml-2 text-sm text-emerald-500 font-medium">Ratio 80%</span>
            </div>
            <div class="mt-4 flex gap-4 text-sm">
              <div class="flex items-center gap-1 text-emerald-500">
                <span class="material-icons-round text-base">thumb_up</span> 28 Won
              </div>
              <div class="flex items-center gap-1 text-rose-500">
                <span class="material-icons-round text-base">thumb_down</span> 7 Lost
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-icons-round text-6xl text-slate-400 dark:text-white">schedule</span>
          </div>
          <div class="relative z-10">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Time on Court</p>
            <div class="flex items-baseline mt-2">
              <span class="text-4xl font-display font-bold">51<span class="text-xl font-normal ml-1 text-slate-400">hr</span></span>
            </div>
            <div class="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Longest match: <span class="text-slate-800 dark:text-white font-medium">02:15 hr</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
              <div class="bg-primary-alt h-full rounded-full" style="width: 75%"></div>
            </div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:shadow-glow transition-all duration-300">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-icons-round text-6xl text-slate-400 dark:text-white">sports_score</span>
          </div>
          <div class="relative z-10">
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tie Breaks</p>
            <div class="flex items-baseline mt-2">
              <span class="text-4xl font-display font-bold">9</span>
              <span class="ml-2 text-sm text-amber-500 font-medium">Ratio 44%</span>
            </div>
            <div class="mt-4 flex gap-4 text-sm">
              <div class="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <span class="material-icons-round text-base">emoji_events</span> 4 Won
              </div>
              <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                5 Lost
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-700 p-6 rounded-2xl relative overflow-hidden text-white shadow-lg">
          <div class="absolute top-0 right-0 p-4 opacity-20">
            <span class="material-icons-round text-6xl text-white">local_fire_department</span>
          </div>
          <div class="relative z-10">
            <p class="text-sm font-medium text-orange-100 uppercase tracking-wider">Best Set Streak</p>
            <div class="flex items-baseline mt-2">
              <span class="text-4xl font-display font-bold">10</span>
              <span class="ml-2 text-sm text-orange-100 font-medium">Sets</span>
            </div>
            <div class="mt-4 text-sm text-orange-100 flex items-center gap-2">
              <span class="material-icons-round text-base animate-pulse">bolt</span>
              Current Streak: <span class="font-bold">2</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Health Data Mini Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-3">
          <h2 class="text-xl font-display font-semibold mb-4 flex items-center gap-2">
            <span class="material-icons-round text-rose-500">favorite</span>
            Physiological & Health Data
          </h2>
        </div>
        
        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-primary flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Active Calories</p>
            <h3 class="text-2xl font-bold mt-1">1,240 <span class="text-sm font-normal text-slate-400">kcal</span></h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span class="material-icons-round">local_fire_department</span>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500 flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Avg Heart Rate</p>
            <h3 class="text-2xl font-bold mt-1">140 <span class="text-sm font-normal text-slate-400">bpm</span></h3>
            <p class="text-xs text-rose-500 mt-1">Max: 178 bpm</p>
          </div>
          <div class="h-12 w-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 relative">
            <span class="material-icons-round animate-ping absolute opacity-20">favorite</span>
            <span class="material-icons-round">favorite</span>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Distance Covered</p>
            <h3 class="text-2xl font-bold mt-1">4.2 <span class="text-sm font-normal text-slate-400">km</span></h3>
          </div>
          <div class="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
            <span class="material-icons-round">directions_run</span>
          </div>
        </div>
      </div>

      <!-- Bubble Chart -->
      <div class="glass-panel p-6 rounded-2xl shadow-lg border border-slate-700/30">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 class="text-xl font-display font-semibold flex items-center gap-2">
              <span class="material-icons-round text-emerald-400">query_stats</span>
              Performance vs. Intensity Correlation
            </h3>
            <p class="text-sm text-slate-400 mt-1">Analysis of point outcomes relative to heart rate exertion</p>
          </div>
          <div class="flex items-center gap-4 text-xs font-semibold bg-slate-800/50 p-2 rounded-lg border border-slate-700">
            <div class="flex items-center gap-2 px-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 shadow-glow-green"></span>
              <span>Won (114)</span>
            </div>
            <div class="flex items-center gap-2 px-2 border-l border-slate-600">
              <span class="w-3 h-3 rounded-full bg-rose-500 shadow-glow-red"></span>
              <span>Lost (102)</span>
            </div>
            <div class="flex items-center gap-2 px-2 border-l border-slate-600 text-amber-500">
              <span class="material-icons-round text-xs">trending_up</span>
              <span>Success Zone: 145-160 BPM</span>
            </div>
          </div>
        </div>
        <div class="relative h-80 w-full">
          <Bubble :data="bubbleChartData" :options="bubbleChartOptions" />
          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 bg-amber-500/10 text-amber-500 border border-amber-500/30 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm pointer-events-none">
            Optimal Intensity Zone
          </div>
        </div>
      </div>

      <!-- Zone Information + HR Timeline -->
      <div class="glass-panel p-8 rounded-2xl shadow-lg border border-slate-700/30">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 class="text-xl font-display font-semibold flex items-center gap-2">
              <span class="material-icons-round text-rose-500">monitor_heart</span>
              Heart Rate Zones
            </h3>
            <p class="text-sm text-slate-400 mt-1">Intensity distribution during the last match (Max 178 BPM)</p>
          </div>
          <div class="flex gap-2 text-xs font-semibold bg-slate-800/50 p-1.5 rounded-lg border border-slate-700">
            <div class="px-3 py-1 rounded bg-slate-700/50 text-slate-300">Avg: 140 BPM</div>
            <div class="px-3 py-1 rounded bg-rose-900/30 text-rose-400 border border-rose-500/20">Peak: 178 BPM</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1 flex flex-col justify-center space-y-6">
            <div class="flex items-center gap-4 group">
              <div class="relative w-16 h-16 flex-shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
                  <path class="text-rose-500 drop-shadow-[0_0_3px_rgba(244,63,94,0.6)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="15, 100" stroke-width="3"></path>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-rose-400">15%</div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-baseline mb-1">
                  <span class="text-sm font-semibold text-rose-400">Peak / Anaerobic</span>
                  <span class="text-xs text-slate-500">165-178 BPM</span>
                </div>
                <div class="text-xs text-slate-400">High intensity rallies & tiebreaks</div>
              </div>
            </div>

            <div class="flex items-center gap-4 group">
              <div class="relative w-16 h-16 flex-shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
                  <path class="text-amber-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="45, 100" stroke-width="3"></path>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-amber-500">45%</div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-baseline mb-1">
                  <span class="text-sm font-semibold text-amber-500">Cardio</span>
                  <span class="text-xs text-slate-500">145-164 BPM</span>
                </div>
                <div class="text-xs text-slate-400">Baseline rallies & sustained play</div>
              </div>
            </div>

            <div class="flex items-center gap-4 group">
              <div class="relative w-16 h-16 flex-shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
                  <path class="text-emerald-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="30, 100" stroke-width="3"></path>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-500">30%</div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-baseline mb-1">
                  <span class="text-sm font-semibold text-emerald-500">Fat Burn</span>
                  <span class="text-xs text-slate-500">120-144 BPM</span>
                </div>
                <div class="text-xs text-slate-400">Recovery between points</div>
              </div>
            </div>

            <div class="flex items-center gap-4 group">
              <div class="relative w-16 h-16 flex-shrink-0">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
                  <path class="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="10, 100" stroke-width="3"></path>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-500">10%</div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-baseline mb-1">
                  <span class="text-sm font-semibold text-blue-500">Warm Up</span>
                  <span class="text-xs text-slate-500">&lt; 120 BPM</span>
                </div>
                <div class="text-xs text-slate-400">Changeovers & Warm-up</div>
              </div>
            </div>
          </div>

          <!-- HR Line Chart -->
          <div class="lg:col-span-2 flex flex-col">
            <div class="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-4 h-full">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-sm font-semibold text-slate-300">Match Heart Rate Timeline</h4>
                <div class="text-xs text-slate-500 flex gap-3">
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Set 1 Tiebreak</span>
                  <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Break Point</span>
                </div>
              </div>
              <div class="relative h-64 w-full">
                <Line :data="hrChartData" :options="hrChartOptions" />
              </div>
            </div>
            <div class="mt-2">
              <div class="flex justify-between text-xs text-slate-400 mb-2">
                <span>Start</span>
                <span>Match Duration</span>
                <span>End</span>
              </div>
              <div class="h-4 w-full rounded-full overflow-hidden flex shadow-inner">
                <div class="h-full bg-blue-500" style="width: 10%"></div>
                <div class="h-full bg-emerald-500" style="width: 30%"></div>
                <div class="h-full bg-amber-500" style="width: 45%"></div>
                <div class="h-full bg-rose-500" style="width: 15%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Result Trend Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="glass-panel p-6 rounded-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-semibold text-lg">Results by Opponent</h3>
            <div class="flex gap-4 text-xs font-bold">
              <div class="flex items-center gap-1 text-emerald-500"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> WON</div>
              <div class="flex items-center gap-1 text-primary-alt"><span class="w-2 h-2 rounded-full bg-primary-alt"></span> LOST</div>
            </div>
          </div>
          <div class="chart-container">
            <Bar :data="opponentChartData" :options="opponentChartOptions" />
          </div>
        </div>
        <div class="glass-panel p-6 rounded-2xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-semibold text-lg">Won/Lost Trends</h3>
            <div class="flex gap-4 text-xs font-bold">
              <div class="flex items-center gap-1 text-emerald-500"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> WON</div>
              <div class="flex items-center gap-1 text-primary-alt"><span class="w-2 h-2 rounded-full bg-primary-alt"></span> LOST</div>
            </div>
          </div>
          <div class="chart-container">
            <Line :data="trendChartData" :options="trendChartOptions" />
          </div>
        </div>
      </div>

      <!-- Point Breakdowns -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
          <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Break Points</h4>
          <div class="relative w-32 h-32 mt-4">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
              <circle class="text-slate-800 dark:text-white stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="251.2" stroke-dashoffset="138" stroke-linecap="round" stroke-width="8"></circle>
            </svg>
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span class="text-2xl font-bold">45%</span>
            </div>
          </div>
          <div class="w-full mt-4 flex justify-between px-4 text-sm">
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-emerald-500 text-sm">thumb_up</span> 223</div>
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-rose-500 text-sm">thumb_down</span> 262</div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
          <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Saved Break Points</h4>
          <div class="relative w-32 h-32 mt-4">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
              <circle class="text-slate-800 dark:text-white stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="251.2" stroke-dashoffset="103" stroke-linecap="round" stroke-width="8"></circle>
            </svg>
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span class="text-2xl font-bold">59%</span>
            </div>
          </div>
          <div class="w-full mt-4 flex justify-between px-4 text-sm">
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-emerald-500 text-sm">thumb_up</span> 253</div>
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-rose-500 text-sm">thumb_down</span> 170</div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
          <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Points Serving</h4>
          <div class="relative w-32 h-32 mt-4">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
              <circle class="text-slate-800 dark:text-white stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="251.2" stroke-dashoffset="123" stroke-linecap="round" stroke-width="8"></circle>
            </svg>
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span class="text-2xl font-bold">51%</span>
            </div>
          </div>
          <div class="w-full mt-4 flex justify-between px-4 text-sm">
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-emerald-500 text-sm">thumb_up</span> 1326</div>
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-rose-500 text-sm">thumb_down</span> 1249</div>
          </div>
        </div>

        <div class="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative">
          <h4 class="text-sm font-medium text-slate-500 dark:text-slate-400 absolute top-4 left-6">Points Receiving</h4>
          <div class="relative w-32 h-32 mt-4">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle class="text-slate-200 dark:text-slate-700 stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-width="8"></circle>
              <circle class="text-slate-800 dark:text-white stroke-current" cx="50" cy="50" fill="transparent" r="40" stroke-dasharray="251.2" stroke-dashoffset="118" stroke-linecap="round" stroke-width="8"></circle>
            </svg>
            <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span class="text-2xl font-bold">53%</span>
            </div>
          </div>
          <div class="w-full mt-4 flex justify-between px-4 text-sm">
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-emerald-500 text-sm">thumb_up</span> 1336</div>
            <div class="flex items-center gap-1 font-medium"><span class="material-icons-round text-rose-500 text-sm">thumb_down</span> 1151</div>
          </div>
        </div>
      </div>
      
      <!-- Table -->
      <div class="glass-panel rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 flex justify-between items-center">
          <h3 class="font-semibold text-lg">Recent Match Results</h3>
          <button class="text-sm text-primary-alt hover:underline">View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-slate-500 dark:text-slate-400 uppercase bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th class="px-6 py-3" scope="col">Result</th>
                <th class="px-6 py-3" scope="col">Score</th>
                <th class="px-6 py-3" scope="col">Date</th>
                <th class="px-6 py-3" scope="col">Opponent</th>
                <th class="px-6 py-3" scope="col">Duration</th>
                <th class="px-6 py-3 text-center" scope="col">Breaks</th>
                <th class="px-6 py-3 text-center" scope="col">Points W|L</th>
                <th class="px-6 py-3" scope="col"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-slate-700/50">
              <tr class="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md">
                    <span class="material-icons-round text-sm">add</span>
                  </div>
                </td>
                <td class="px-6 py-4 font-display font-medium">
                  <span class="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">6-2 6-3</span>
                </td>
                <td class="px-6 py-4 text-slate-500 dark:text-slate-400">2026-02-25 20:12</td>
                <td class="px-6 py-4 font-medium">J. Rodriguez</td>
                <td class="px-6 py-4">1h 11m</td>
                <td class="px-6 py-4 text-center">6/0</td>
                <td class="px-6 py-4 text-center">45|31</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-icons-round text-base">delete</span>
                  </button>
                </td>
              </tr>
              <tr class="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md">
                    <span class="material-icons-round text-sm">add</span>
                  </div>
                </td>
                <td class="px-6 py-4 font-display font-medium">
                  <span class="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">6-2 3-6 6-3</span>
                </td>
                <td class="px-6 py-4 text-slate-500 dark:text-slate-400">2024-09-09 21:41</td>
                <td class="px-6 py-4 font-medium">Marian</td>
                <td class="px-6 py-4">1h 30m</td>
                <td class="px-6 py-4 text-center">9/12</td>
                <td class="px-6 py-4 text-center">40|38</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-icons-round text-base">delete</span>
                  </button>
                </td>
              </tr>
              <tr class="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md">
                    <span class="material-icons-round text-sm">add</span>
                  </div>
                </td>
                <td class="px-6 py-4 font-display font-medium">
                  <span class="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">6-7(5) 6-3 6-4</span>
                </td>
                <td class="px-6 py-4 text-slate-500 dark:text-slate-400">2023-06-04 10:38</td>
                <td class="px-6 py-4 font-medium">Marian</td>
                <td class="px-6 py-4">2h 08m</td>
                <td class="px-6 py-4 text-center">10/22</td>
                <td class="px-6 py-4 text-center">55|54</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-red-500 transition-colors">
                    <span class="material-icons-round text-base">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bubble, Bar, Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler);
ChartJS.defaults.color = '#94a3b8';
ChartJS.defaults.borderColor = '#334155';

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

const wonPoints = Array.from({length: 45}, () => ({
  x: Math.floor(Math.random() * (165 - 135) + 135),
  y: Math.floor(Math.random() * 25 + 5),
  r: Math.floor(Math.random() * 8 + 4)
}));
wonPoints.push({x: 175, y: 15, r: 6}, {x: 120, y: 4, r: 3});

const lostPoints = Array.from({length: 40}, () => ({
  x: Math.floor(Math.random() * (180 - 150) + 150),
  y: Math.floor(Math.random() * 20 + 3),
  r: Math.floor(Math.random() * 8 + 4)
}));
for(let i=0; i<10; i++) {
  lostPoints.push({
    x: Math.floor(Math.random() * (130 - 100) + 100),
    y: Math.floor(Math.random() * 5 + 1),
    r: 4
  });
}

const bubbleChartData = ref({
  datasets: [
    {
      label: 'Points Won',
      data: wonPoints,
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
      borderColor: '#10B981',
      borderWidth: 1,
      hoverRadius: 2,
    },
    {
      label: 'Points Lost',
      data: lostPoints,
      backgroundColor: 'rgba(244, 63, 94, 0.7)',
      borderColor: '#F43F5E',
      borderWidth: 1,
      hoverRadius: 2,
    }
  ]
});

const bubbleChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `HR: ${context.raw.x} bpm | Duration: ${context.raw.y}s`;
        }
      },
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#e2e8f0',
      bodyColor: '#94a3b8',
      borderColor: '#334155',
      borderWidth: 1,
      padding: 10
    }
  },
  scales: {
    x: {
      type: 'linear' as const,
      position: 'bottom' as const,
      title: {
        display: true,
        text: 'Heart Rate (BPM)',
        color: '#64748b',
        font: { size: 12, weight: 'bold' as const }
      },
      min: 90,
      max: 190,
      grid: {
        color: function(context: any) {
          if (context.tick.value >= 145 && context.tick.value <= 160) {
            return 'rgba(245, 158, 11, 0.15)';
          }
          return 'rgba(51, 65, 85, 0.3)';
        },
        borderDash: [5, 5]
      }
    },
    y: {
      title: {
        display: true,
        text: 'Rally Duration (Seconds)',
        color: '#64748b',
        font: { size: 12, weight: 'bold' as const }
      },
      beginAtZero: true,
      grid: { color: 'rgba(51, 65, 85, 0.3)' }
    }
  }
});

const opponentChartData = ref({
  labels: ['Opponent', 'Marian', 'Cano', 'Jonathan'],
  datasets: [
    {
      label: 'Won',
      data: [5, 22, 0, 1],
      backgroundColor: '#10B981',
      borderRadius: 4,
      barPercentage: 0.6,
    },
    {
      label: 'Lost',
      data: [1, 4, 2, 0],
      backgroundColor: '#3B82F6',
      borderRadius: 4,
      barPercentage: 0.6,
    }
  ]
});

const opponentChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: 'rgba(51, 65, 85, 0.5)' }
    }
  }
});

const trendChartData = ref({
  labels: ['2020', '2021', '2022', '2023', '2024', '2026'],
  datasets: [
    {
      label: 'Won',
      data: [12, 4, 7, 3, 1, 1],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#10B981',
      pointRadius: 4
    },
    {
      label: 'Lost',
      data: [5, 1, 1, 0, 0, 0],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#3B82F6',
      pointRadius: 4
    }
  ]
});

const trendChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(51, 65, 85, 0.5)' }
    }
  }
});

const hrChartData = ref({
  labels: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15'],
  datasets: [{
    label: 'Heart Rate (BPM)',
    data: [110, 135, 155, 142, 168, 175, 145, 160, 150, 138],
    borderColor: '#f43f5e',
    backgroundColor: 'rgba(244, 63, 94, 0.2)',
    borderWidth: 3,
    tension: 0.4,
    fill: true,
    pointBackgroundColor: '#1e293b',
    pointBorderColor: '#f43f5e',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6
  }]
});

const hrChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#94a3b8',
      bodyColor: '#e2e8f0',
      borderColor: '#334155',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: { display: false, color: '#334155' },
      ticks: { color: '#64748b' }
    },
    y: {
      min: 80,
      max: 190,
      grid: { color: 'rgba(51, 65, 85, 0.3)' },
      ticks: { color: '#64748b' }
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false
  }
});
</script>