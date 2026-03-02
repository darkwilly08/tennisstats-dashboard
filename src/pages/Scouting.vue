<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
    <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <!-- Header -->
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark px-10 py-3 sticky top-0 z-50 shadow-md">
          <div class="flex items-center gap-8">
            <router-link to="/" class="flex items-center gap-4 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
              <div class="size-8 text-primary">
                <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                  <path clip-rule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </div>
              <h2 class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">CourtCommand</h2>
            </router-link>
            <div class="flex items-center gap-9 hidden md:flex">
              <a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
              <a class="text-slate-900 dark:text-white text-sm font-medium leading-normal transition-colors" href="#">Matches</a>
              <a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Players</a>
              <a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Analysis</a>
              <a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Settings</a>
            </div>
          </div>
          <div class="flex flex-1 justify-end gap-6 items-center">
            <label class="flex flex-col min-w-40 !h-10 max-w-64">
              <div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-primary dark:focus-within:border-primary transition-colors">
                <div class="text-slate-400 flex items-center justify-center pl-3">
                  <span class="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input class="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 text-sm" placeholder="Search player..." value=""/>
              </div>
            </label>
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-200 dark:border-slate-700" data-alt="User profile picture showing a young athlete" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4xlKACHviSctaQfxKgdpnAKHIr661wufBt4vaX9isNKt8H900lw9QNPjUA99tS0QM2yUu90Eif8Uhkh8ji-_eyNVE8LvZKryU5Q4AWgLHmnJi80sapIaXR2VdKge6X-9e4Yebn7Dl_KkRbUmp9lo6758YDczYoZuWY4VKbvGEiu3QGNYqq1w8ZzDx4XHqrXsC-3kMRsTjS2cY6nkVJHm-R2tuigu_OSchfNC-2_6DMxaWM5UJBXA2W2Z36adZWMsaWOgi51EfjE');"></div>
          </div>
        </header>

        <main class="flex-1 px-4 md:px-10 py-8 max-w-[1400px] mx-auto w-full">
          <!-- Hero Section -->
          <div class="flex flex-col lg:flex-row justify-between gap-6 mb-10 items-end">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                <span class="material-symbols-outlined text-lg">swords</span>
                Rivalry Analysis
              </div>
              <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                You <span class="text-slate-400 dark:text-slate-600 font-light mx-2">vs</span> Marian
              </h1>
              <p class="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
                Deep dive into head-to-head statistics, tactical patterns, and match history for upcoming tournament preparation.
              </p>
            </div>
            <div class="flex gap-3">
              <button class="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <span class="material-symbols-outlined text-lg">share</span>
                Share Report
              </button>
              <button class="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-primary/20 transition-colors">
                <span class="material-symbols-outlined text-lg">download</span>
                Export PDF
              </button>
            </div>
          </div>

          <!-- Stats Overview Cards -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-primary">trophy</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Head-to-Head</p>
              <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-slate-900 dark:text-white">12 - 8</h3>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">+4 Lead</span>
              </div>
            </div>

            <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-primary">sports_tennis</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Sets Played</p>
              <h3 class="text-3xl font-bold text-slate-900 dark:text-white">58</h3>
            </div>

            <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-primary">trending_up</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Current Streak</p>
              <div class="flex items-baseline gap-2">
                <h3 class="text-3xl font-bold text-primary">Won 3</h3>
                <span class="text-xs text-slate-500 dark:text-slate-400">Last loss: 2 months ago</span>
              </div>
            </div>

            <div class="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span class="material-symbols-outlined text-6xl text-primary">stadium</span>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Surface Preference</p>
              <h3 class="text-3xl font-bold text-slate-900 dark:text-white">Hard Court</h3>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Left Column: Tale of the Tape -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Comparison Visual -->
              <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">compare_arrows</span>
                    Tale of the Tape
                  </h3>
                  <div class="flex gap-2">
                    <span class="w-3 h-3 rounded-full bg-primary"></span>
                    <span class="text-xs text-slate-500">You</span>
                    <span class="w-3 h-3 rounded-full bg-slate-600 ml-2"></span>
                    <span class="text-xs text-slate-500">Marian</span>
                  </div>
                </div>
                
                <div class="relative h-64 md:h-80 w-full bg-slate-900">
                  <!-- Background split -->
                  <div class="absolute inset-0 flex">
                    <div class="w-1/2 bg-gradient-to-r from-primary/20 to-transparent"></div>
                    <div class="w-1/2 bg-gradient-to-l from-slate-700/30 to-transparent"></div>
                  </div>
                  
                  <!-- Players Images -->
                  <div class="absolute inset-0 flex justify-between items-end px-4 md:px-16 pb-0">
                    <div class="w-40 md:w-56 aspect-[3/4] bg-cover bg-top relative z-10" data-alt="Action shot of the user serving" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQ898J92JhAG8O-8c0JcmB5L3R0zABWo92Xha1PCutmZfZxabnkR7otzF-NrIfsqk0tg5XATEjJkC-Qyjy1gPUWrjwsquuEMUUHfErITjdx9VbEgi7brTpkYSw27_kQ7HP30_JPMGMBEmJoc_q9ir_sxZP-yNLEoC1sfDpTz4a6Tk2xksDkXTn3lwGyHXU9ELgjZmPkq16MW5dUBRl_iFxil5g2VsS5QnfGi_ill8SIl50nrKjz63vKo6ER8jH9GGqbZrjTLJyyVI'); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);"></div>
                    
                    <!-- VS Badge -->
                    <div class="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center">
                      <div class="w-12 h-12 rounded-full bg-surface-dark border-2 border-slate-700 flex items-center justify-center text-xl font-black text-white italic shadow-xl">
                        VS
                      </div>
                    </div>
                    
                    <div class="w-40 md:w-56 aspect-[3/4] bg-cover bg-top relative z-10 scale-x-[-1]" data-alt="Action shot of rival player Marian hitting a forehand" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsnFAWV_a8FxXwYiynfkIT-snKLWTHl2F-VSSrjwtMwzlVBx2BsqSMKqUYSbnc3aFENHHan5rwEoCNAfMHIHVWISy0SkEZBGbIPkdfvkOumRSGcM54Z6sNJmuZZETEKx7Ds5TlLDE0g9P-NTuM69IsRXmhJ3Mo337aDIBprvaN3Q5FQy8kG5ZXL7QlLS9dnRWjB5cersAOAmyl9Z4nI87H2FhxdqMQPDcwPm6G965z5cc9rO4YPzN3XInRZa87PuWcVPLSMLdAgBU'); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);"></div>
                  </div>
                </div>
                
                <!-- Stats Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th class="py-3 px-6 w-1/3 text-right">You</th>
                        <th class="py-3 px-6 w-1/3 text-center">Metric</th>
                        <th class="py-3 px-6 w-1/3 text-left">Marian</th>
                      </tr>
                    </thead>
                    <tbody class="text-slate-700 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-800">
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td class="py-4 px-6 text-right font-semibold text-primary">15</td>
                        <td class="py-4 px-6 text-center text-sm text-slate-500">Rank</td>
                        <td class="py-4 px-6 text-left font-semibold">12</td>
                      </tr>
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td class="py-4 px-6 text-right font-medium">6'1"</td>
                        <td class="py-4 px-6 text-center text-sm text-slate-500">Height</td>
                        <td class="py-4 px-6 text-left font-medium">6'3"</td>
                      </tr>
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td class="py-4 px-6 text-right font-medium">Right-Handed</td>
                        <td class="py-4 px-6 text-center text-sm text-slate-500">Plays</td>
                        <td class="py-4 px-6 text-left font-medium text-red-400">Left-Handed</td>
                      </tr>
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td class="py-4 px-6 text-right font-bold text-green-500">72%</td>
                        <td class="py-4 px-6 text-center text-sm text-slate-500">YTD Win %</td>
                        <td class="py-4 px-6 text-left font-medium">68%</td>
                      </tr>
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td class="py-4 px-6 text-right font-medium">124 mph</td>
                        <td class="py-4 px-6 text-center text-sm text-slate-500">Avg 1st Serve</td>
                        <td class="py-4 px-6 text-left font-bold text-primary">131 mph</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- History of Wars -->
              <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">history</span>
                    History of Wars
                  </h3>
                  <button class="text-sm text-primary hover:text-primary-light font-medium">View All Matches</button>
                </div>
                
                <div class="space-y-4">
                  <!-- Match Item Win -->
                  <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border-l-4 border-green-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4 mb-3 sm:mb-0 w-full sm:w-auto">
                      <div class="flex flex-col items-center justify-center min-w-[60px]">
                        <span class="text-xs font-bold text-slate-400 uppercase">Aug 24</span>
                        <span class="text-sm text-slate-500">2023</span>
                      </div>
                      <div>
                        <p class="font-bold text-slate-900 dark:text-white">US Open - QF</p>
                        <p class="text-xs text-slate-500">Hard Court • New York</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-6">
                      <div class="flex gap-4 items-center">
                        <span class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">6-4, 7-6<sup class="text-sm font-medium text-slate-500">4</sup>, 6-2</span>
                      </div>
                      <div class="size-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold text-xs">W</div>
                      <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                  </div>

                  <!-- Match Item Win -->
                  <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border-l-4 border-green-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4 mb-3 sm:mb-0 w-full sm:w-auto">
                      <div class="flex flex-col items-center justify-center min-w-[60px]">
                        <span class="text-xs font-bold text-slate-400 uppercase">May 12</span>
                        <span class="text-sm text-slate-500">2023</span>
                      </div>
                      <div>
                        <p class="font-bold text-slate-900 dark:text-white">Rome Masters - R16</p>
                        <p class="text-xs text-slate-500">Clay • Rome</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-6">
                      <div class="flex gap-4 items-center">
                        <span class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">7-5, 6-4</span>
                      </div>
                      <div class="size-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center font-bold text-xs">W</div>
                      <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                  </div>

                  <!-- Match Item Loss -->
                  <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-lg border-l-4 border-red-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4 mb-3 sm:mb-0 w-full sm:w-auto">
                      <div class="flex flex-col items-center justify-center min-w-[60px]">
                        <span class="text-xs font-bold text-slate-400 uppercase">Jan 18</span>
                        <span class="text-sm text-slate-500">2023</span>
                      </div>
                      <div>
                        <p class="font-bold text-slate-900 dark:text-white">Aus Open - R32</p>
                        <p class="text-xs text-slate-500">Hard Court • Melbourne</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-6">
                      <div class="flex gap-4 items-center opacity-75">
                        <span class="text-3xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">4-6, 6-3, 3-6, 5-7</span>
                      </div>
                      <div class="size-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-xs">L</div>
                      <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Strategic Insights & Momentum -->
            <div class="space-y-8">
              <!-- Strategic Insights -->
              <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">lightbulb</span>
                    Tactical Notes
                  </h3>
                  <button class="size-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary dark:hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                
                <div class="grid grid-cols-1 gap-3">
                  <!-- Note 1 -->
                  <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm relative group">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-xs font-bold uppercase text-yellow-600 dark:text-yellow-400 tracking-wider">Weakness</span>
                      <span class="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-white">more_horiz</span>
                    </div>
                    <p class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug">
                      Backhand slice floats high when pulled wide. Ideal approach opportunity.
                    </p>
                  </div>
                  
                  <!-- Note 2 -->
                  <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm relative group">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">Pattern</span>
                      <span class="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-white">more_horiz</span>
                    </div>
                    <p class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug">
                      Serves wide on ad-court break points 80% of the time.
                    </p>
                  </div>
                  
                  <!-- Note 3 -->
                  <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-lg shadow-sm relative group">
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-xs font-bold uppercase text-red-600 dark:text-red-400 tracking-wider">Danger Zone</span>
                      <span class="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-white">more_horiz</span>
                    </div>
                    <p class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug">
                      Forehand inside-out is lethal. Do not leave balls short in the middle.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Momentum Graph (Visual Representation) -->
              <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">ssid_chart</span>
                    Win Momentum
                  </h3>
                </div>
                
                <!-- Custom Graph Visualization using CSS/HTML -->
                <div class="relative h-48 w-full mt-6">
                  <!-- Grid Lines -->
                  <div class="absolute inset-0 flex flex-col justify-between text-xs text-slate-500">
                    <div class="border-b border-dashed border-slate-700 w-full h-0"></div>
                    <div class="border-b border-dashed border-slate-700 w-full h-0"></div>
                    <div class="border-b border-dashed border-slate-700 w-full h-0"></div>
                  </div>
                  
                  <!-- Trend Line (Using SVG for simplicity) -->
                  <svg class="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#0db9f2" stop-opacity="0.2"></stop>
                        <stop offset="100%" stop-color="#0db9f2" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,100 C20,90 40,110 60,80 C80,50 100,60 120,40 C140,20 160,30 180,10 C200,5 220,15 240,5" fill="none" stroke="#0db9f2" stroke-width="3" vector-effect="non-scaling-stroke"></path>
                    <path d="M0,100 C20,90 40,110 60,80 C80,50 100,60 120,40 C140,20 160,30 180,10 C200,5 220,15 240,5 V192 H0 Z" fill="url(#gradientArea)" style="mix-blend-mode: screen;" vector-effect="non-scaling-stroke"></path>
                    
                    <!-- Data Points -->
                    <circle class="fill-surface-dark stroke-primary stroke-2" cx="60" cy="80" r="4"></circle>
                    <circle class="fill-surface-dark stroke-primary stroke-2" cx="120" cy="40" r="4"></circle>
                    <circle class="fill-surface-dark stroke-primary stroke-2" cx="180" cy="10" r="4"></circle>
                    <circle class="fill-primary stroke-white stroke-2 animate-pulse" cx="240" cy="5" r="5"></circle>
                  </svg>
                  
                  <div class="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-500 pt-2 uppercase tracking-wider">
                    <span>2020</span>
                    <span>2021</span>
                    <span>2022</span>
                    <span>2023</span>
                  </div>
                </div>
                <p class="text-xs text-slate-500 mt-4 text-center">Rivalry trend over the last 4 years. Higher indicates your dominance.</p>
              </div>

              <!-- AI Prediction -->
              <div class="bg-gradient-to-br from-primary/20 to-surface-dark rounded-xl border border-primary/30 p-6 shadow-sm">
                <div class="flex items-start gap-4">
                  <div class="rounded-full bg-primary/20 p-2 text-primary">
                    <span class="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div>
                    <h4 class="text-white font-bold text-sm mb-1">AI Prediction</h4>
                    <p class="text-slate-300 text-sm">Based on recent hard court performance and tactical adjustments, you have a <span class="text-primary font-bold">65% chance of winning</span> the next encounter.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Scouting Report Logic
</script>