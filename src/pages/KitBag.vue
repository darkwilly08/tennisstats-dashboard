<template>
  <div class="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-x-hidden">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-[#283539] bg-background-light dark:bg-background-dark/95 backdrop-blur-md px-4 sm:px-10 py-3">
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <div class="size-8 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">The Kit Bag</h2>
        </router-link>
        <div class="hidden lg:flex items-center gap-9">
          <a class="text-slate-900 dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
          <a class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Gear Locker</a>
          <a class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Maintenance Log</a>
          <a class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Settings</a>
        </div>
      </div>
      <div class="flex flex-1 justify-end gap-6">
        <label class="hidden md:flex flex-col min-w-40 !h-10 max-w-64 group">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 dark:border-[#283539] bg-white dark:bg-[#1b282c] group-focus-within:border-primary transition-colors">
            <div class="text-slate-400 dark:text-[#9cb2ba] flex items-center justify-center pl-3">
              <span class="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#9cb2ba] px-3 focus:ring-0 focus:outline-none text-sm font-normal leading-normal" placeholder="Search gear..." value="" />
          </div>
        </label>
        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-slate-200 dark:ring-[#283539] cursor-pointer" data-alt="User profile picture of a man" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-6AYs8bNx8z938rKi8_eFXupeRVPcUvIDw6Qpfsd_O7XBCvjXLWNZt-aKNf932eqTvysYppicFpD01F0okrqFQ04FzZ2yCDIxHCbRolzKojKy3xEReUPf5NsXNuo1XQ8YzuMONHIv45dI6Cxmw4vqUOTQySh0UiCNthM6nJiJzs0ey_xUjLiLeYjGcSqgH8_kEUq_o9C7qtMvnNQ2GdFyL59S53qDHYf4r0zRbFFuvjyjjP1N0T6CO8-v9tpEZaNRQ6KUNdejgp4');"></div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center py-8 px-4 sm:px-10">
      <div class="w-full max-w-[1200px] flex flex-col gap-8">
        
        <!-- Hero Section -->
        <div class="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 dark:border-[#283539] pb-6">
          <div class="flex flex-col gap-2">
            <p class="text-slate-900 dark:text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]">My Gear Garage</p>
            <p class="text-slate-500 dark:text-[#9cb2ba] text-base font-normal">Track wear, tear, and performance metrics.</p>
          </div>
          <button class="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors border border-primary/20">
            <span class="material-symbols-outlined text-xl">add</span>
            <span class="text-sm font-medium">Add New Gear</span>
          </button>
        </div>

        <!-- Active Racquets Section -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-slate-900 dark:text-white text-2xl font-bold">Active Racquets</h2>
            <span class="text-xs font-medium text-slate-500 dark:text-[#9cb2ba] uppercase tracking-wider">2 in rotation</span>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Racquet Card 1 (Primary) -->
            <div class="group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#283539] shadow-sm hover:shadow-md transition-all">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div class="h-48 w-full bg-cover bg-center relative" data-alt="Close up of a tennis racquet strings and frame on a dark court" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuApA0UIk8t5pJOGLNE7g3qD9NoI9nW4YhkXHGLqpyj8nVKAEBcs95-JpCBdPbltva2mBkM2njOFpZqi3gyqsAyYGbJ3MzyiDkBFyBvOq0Yib-_zSsBTzK964XCBoCiYsMuqCEFAQu3euJJpjNw3rK8VAXBNJwHGSj-YKg8LNfBF-AtNK0xCmnpkxPN_59FLZNzjvmAvRshDNgehJ2zKHL0HE36sLdTsCnsuctb7E4nlcTyQRx0kps1vQ_sE8K4gWdDgCk67g-bN3i8');">
                <div class="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-2 py-1 rounded">PRIMARY</div>
              </div>
              <div class="relative z-20 p-6 -mt-12">
                <h3 class="text-white text-2xl font-bold tracking-tight mb-1">Babolat Pure Aero</h3>
                <p class="text-slate-300 text-sm mb-6">Last Restring: 2 weeks ago</p>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider mb-1">Tension</p>
                    <p class="text-white text-lg font-mono">54 lbs</p>
                  </div>
                  <div class="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider mb-1">String</p>
                    <p class="text-white text-lg font-medium truncate">RPM Blast 17g</p>
                  </div>
                </div>
                
                <div class="space-y-2 mb-6">
                  <div class="flex justify-between items-end">
                    <span class="text-slate-200 text-sm font-medium">String Health</span>
                    <span class="text-primary text-sm font-bold">12 hrs played</span>
                  </div>
                  <div class="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-green-400 to-yellow-400 w-[60%] rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                  </div>
                  <p class="text-slate-400 text-xs text-right pt-1">Estimated 8 hours remaining</p>
                </div>
                
                <div class="flex gap-3">
                  <button class="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                    <span class="material-symbols-outlined text-lg group-hover/btn:rotate-90 transition-transform">settings</span>
                    Manage
                  </button>
                  <button class="flex-1 bg-primary hover:bg-primary/90 text-background-dark font-bold py-2.5 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(13,185,242,0.3)] hover:shadow-[0_0_20px_rgba(13,185,242,0.5)] flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-lg">autorenew</span>
                    Restring
                  </button>
                </div>
              </div>
            </div>

            <!-- Racquet Card 2 (Secondary) -->
            <div class="group relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#283539] shadow-sm hover:shadow-md transition-all opacity-80 hover:opacity-100">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
              <div class="h-48 w-full bg-cover bg-center relative grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="Tennis racquet handle and frame resting on a blue hard court" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjyu1wPML-VqrC6vhJqouuDvuRXYuRbfYFNpUUikuqnjaO-8mgj1En3ayglm5rz1-FRYC1orfnb-fEGFJPCKmeJSZcagLinejRLGQwwCcLVD7MnLKZ29A9ZymuHiwsIfRdj3F-hJyuhgHavkRPZAOOvbtGlcOccaDYXsU_wFbO2Dh38cw8XHc0sop9hOsNW68-uJQVjH5B-FOxly9KF2Yg0YKLoksay043m_nNZrBhibq4uWrk3RumwuOHlpgWLdqmbIihMgEx9P4');">
                <div class="absolute top-4 left-4 bg-slate-700 text-white text-xs font-bold px-2 py-1 rounded">BACKUP</div>
              </div>
              <div class="relative z-20 p-6 -mt-12">
                <h3 class="text-white text-2xl font-bold tracking-tight mb-1">Wilson Blade v8</h3>
                <p class="text-slate-300 text-sm mb-6">Last Restring: 2 months ago</p>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider mb-1">Tension</p>
                    <p class="text-white text-lg font-mono">52 lbs</p>
                  </div>
                  <div class="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider mb-1">String</p>
                    <p class="text-white text-lg font-medium truncate">Luxilon Alu Power</p>
                  </div>
                </div>
                
                <div class="space-y-2 mb-6">
                  <div class="flex justify-between items-end">
                    <span class="text-slate-200 text-sm font-medium">String Health</span>
                    <span class="text-red-400 text-sm font-bold">32 hrs played</span>
                  </div>
                  <div class="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-orange-500 to-red-600 w-[95%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  </div>
                  <p class="text-red-300 text-xs text-right pt-1 flex items-center justify-end gap-1">
                    <span class="material-symbols-outlined text-sm">warning</span>
                    Restring Recommended
                  </p>
                </div>
                
                <div class="flex gap-3">
                  <button class="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                    <span class="material-symbols-outlined text-lg group-hover/btn:rotate-90 transition-transform">settings</span>
                    Manage
                  </button>
                  <button class="flex-1 bg-white/10 hover:bg-primary hover:text-background-dark hover:border-primary backdrop-blur-md text-white border border-white/10 font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-lg">autorenew</span>
                    Restring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Shoe Section -->
          <div class="md:col-span-2 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#283539] p-6 shadow-sm flex flex-col justify-between">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-slate-900 dark:text-white text-xl font-bold mb-1">Footwear Rotation</h3>
                <p class="text-slate-500 dark:text-[#9cb2ba] text-sm">Asics Court FF 3</p>
              </div>
              <div class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">ACTIVE</div>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center gap-8">
              <div class="relative size-32 sm:size-40 flex items-center justify-center bg-background-light dark:bg-surface-darker rounded-full border-4 border-slate-200 dark:border-[#283539]">
                <span class="material-symbols-outlined text-6xl sm:text-7xl text-slate-300 dark:text-slate-600">do_not_step</span>
                <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent -rotate-45" style="border-right-color: transparent"></div>
              </div>
              
              <div class="flex-1 w-full space-y-4">
                <div class="flex justify-between items-end border-b border-slate-200 dark:border-[#283539] pb-2">
                  <span class="text-slate-500 dark:text-[#9cb2ba] text-sm font-medium">Distance Covered</span>
                  <span class="text-2xl font-mono font-bold text-slate-900 dark:text-white">42.8 <span class="text-sm text-slate-500 font-normal">km</span></span>
                </div>
                <div class="flex justify-between items-end border-b border-slate-200 dark:border-[#283539] pb-2">
                  <span class="text-slate-500 dark:text-[#9cb2ba] text-sm font-medium">Court Surface</span>
                  <span class="text-base font-bold text-slate-900 dark:text-white">Hard Court</span>
                </div>
                <div class="pt-2">
                  <p class="text-xs text-slate-400 dark:text-slate-500 mb-2">Sole Wear Pattern Analysis</p>
                  <div class="flex gap-1 h-1.5 w-full">
                    <div class="bg-primary flex-1 rounded-full"></div>
                    <div class="bg-primary flex-1 rounded-full"></div>
                    <div class="bg-primary flex-1 rounded-full"></div>
                    <div class="bg-primary/30 flex-1 rounded-full"></div>
                    <div class="bg-slate-700 flex-1 rounded-full"></div>
                  </div>
                  <p class="text-right text-xs text-primary mt-1 font-medium">Good Grip</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Maintenance Log Summary -->
          <div class="rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#283539] p-6 shadow-sm flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-slate-900 dark:text-white text-xl font-bold">Recent Logs</h3>
              <a class="text-primary text-sm hover:underline" href="#">View All</a>
            </div>
            
            <div class="space-y-4 flex-1 overflow-y-auto pr-1">
              <!-- Log Item 1 -->
              <div class="flex gap-3 items-start group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
                <div class="mt-1 size-8 rounded-full bg-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-sm">history_edu</span>
                </div>
                <div>
                  <p class="text-slate-900 dark:text-slate-200 text-sm font-medium group-hover:text-primary transition-colors">Overgrip Changed</p>
                  <p class="text-slate-500 text-xs">Babolat Pure Aero • Yesterday</p>
                </div>
              </div>
              <!-- Log Item 2 -->
              <div class="flex gap-3 items-start group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
                <div class="mt-1 size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-sm">build</span>
                </div>
                <div>
                  <p class="text-slate-900 dark:text-slate-200 text-sm font-medium group-hover:text-primary transition-colors">Full Restring</p>
                  <p class="text-slate-500 text-xs">Wilson Blade v8 • 2 months ago</p>
                </div>
              </div>
              <!-- Log Item 3 -->
              <div class="flex gap-3 items-start group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors -mx-2">
                <div class="mt-1 size-8 rounded-full bg-purple-500/20 text-purple-500 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-sm">shopping_bag</span>
                </div>
                <div>
                  <p class="text-slate-900 dark:text-slate-200 text-sm font-medium group-hover:text-primary transition-colors">New Shoes Added</p>
                  <p class="text-slate-500 text-xs">Asics Court FF 3 • 3 months ago</p>
                </div>
              </div>
            </div>
            
            <button class="mt-4 w-full border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">add_circle</span>
              Log Activity
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Kit Bag logic can go here later
</script>