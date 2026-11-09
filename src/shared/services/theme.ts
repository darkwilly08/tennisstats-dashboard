import { ref } from 'vue';

declare global {
  interface Window {
    setTheme?: (theme: string) => void;
  }
}

export type ThemeMode = 'dark' | 'light';

export const isDark = ref<boolean>(false);

export function applyTheme(theme: ThemeMode): void {
  isDark.value = theme === 'dark';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.warn('[Theme] Could not save theme to localStorage:', e);
  }
}

export function toggleTheme(): void {
  const newTheme: ThemeMode = isDark.value ? 'light' : 'dark';
  applyTheme(newTheme);

  // Notify Flutter if running inside WebView
  if (window.flutter_inappwebview && typeof window.flutter_inappwebview.callHandler === 'function') {
    try {
      window.flutter_inappwebview.callHandler('setAppTheme', newTheme);
    } catch (e) {
      console.warn('[Theme] Failed to notify Flutter of theme change:', e);
    }
  }
}

export function initTheme(): void {
  let initialTheme: ThemeMode = 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      initialTheme = stored;
    } else if (document.documentElement.classList.contains('dark')) {
      initialTheme = 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      initialTheme = 'light';
    }
  } catch {
    // fallback to dark
  }

  applyTheme(initialTheme);

  // Coordinate theme via global window.setTheme
  window.setTheme = (theme: string) => {
    applyTheme(theme === 'dark' ? 'dark' : 'light');
  };

  // Coordinate theme via themeChanged event
  window.addEventListener('themeChanged', ((event: CustomEvent<{ theme?: string }>) => {
    const newTheme = event.detail?.theme;
    if (newTheme === 'dark' || newTheme === 'light') {
      applyTheme(newTheme);
    }
  }) as EventListener);
}
