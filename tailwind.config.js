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
        // Union of all primary colors
        "primary": "#0db9f2",        // Used in Kit Bag, Tourney Hub, Scouting
        "primary-alt": "#3B82F6",    // Used in Analytics as "primary"
        "primary-dark": "#0a92bf",
        "primary-light": "#3ec7f5",
        
        // Other Analytics colors
        "secondary": "#10B981",      // Vibrant Green
        "accent": "#F97316",         // Orange for highlight

        // Backgrounds
        "background-light": "#f5f8f8", // From kit bag
        "background-dark": "#101e22",  // From kit bag
        "background-dark-alt": "#0F172A", // From analytics

        // Surfaces
        "surface-light": "#FFFFFF",
        "surface-dark": "#1b282c",     // From kit bag
        "surface-dark-alt": "#1E293B", // From analytics
        "surface-darker": "#152024",   // From kit bag
        "card-dark": "#334155",        // From analytics
        
        // Text specific
        "text-primary-dark": "#e2e8f0",
        "text-secondary-dark": "#94a3b8",
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
        "2xl": "1.5rem",
        "full": "9999px",
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 15px rgba(244, 63, 94, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
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