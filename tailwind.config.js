/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Material 3 Design Tokens
        "primary": "var(--md-sys-color-primary)",
        "on-primary": "var(--md-sys-color-on-primary)",
        "primary-container": "var(--md-sys-color-primary-container)",
        "on-primary-container": "var(--md-sys-color-on-primary-container)",
        "secondary": "var(--md-sys-color-secondary)",
        "on-secondary": "var(--md-sys-color-on-secondary)",
        "secondary-container": "var(--md-sys-color-secondary-container)",
        "on-secondary-container": "var(--md-sys-color-on-secondary-container)",
        "background": "var(--md-sys-color-background)",
        "on-background": "var(--md-sys-color-on-background)",
        "surface": "var(--md-sys-color-surface)",
        "surface-variant": "var(--md-sys-color-surface-variant)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
        "outline": "var(--md-sys-color-outline)",
        "outline-variant": "var(--md-sys-color-outline-variant)",

        // Semantic compatibility mappings
        "primary-alt": "var(--md-sys-color-primary)",
        "primary-dark": "#005138",
        "primary-light": "#8FF7C7",
        "accent": "#F59E0B",
        "background-light": "#F8FAFC",
        "background-dark": "#0B0F19",
        "background-dark-alt": "#0B0F19",
        "surface-light": "#FFFFFF",
        "surface-dark": "#111827",
        "surface-dark-alt": "#1E293B",
        "surface-darker": "#0B0F19",
        "card-dark": "#111827",
        "text-primary-dark": "#F8FAFC",
        "text-secondary-dark": "#94A3B8",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
        "oswald": ["Oswald", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 108, 76, 0.25)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.3)',
        'glow-red': '0 0 15px rgba(244, 63, 94, 0.3)',
        'glass': '0 4px 20px 0 rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    import('@tailwindcss/forms'),
    import('@tailwindcss/container-queries'),
    import('@tailwindcss/typography'),
  ],
}
