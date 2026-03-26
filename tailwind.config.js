/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Material Design 3 Color System from PRD
      colors: {
        // Primary - 蓝色系
        primary: {
          DEFAULT: '#0053ca',
          dim: '#0049b2',
          fixed: '#769dff',
          'fixed-dim': '#5f8fff',
          container: '#769dff',
        },
        'on-primary': {
          DEFAULT: '#f1f2ff',
          fixed: '#000000',
          'fixed-variant': '#002869',
          container: '#001f56',
        },

        // Secondary - 绿色系
        secondary: {
          DEFAULT: '#006a28',
          dim: '#005d22',
          fixed: '#5cfd80',
          'fixed-dim': '#4bee74',
          container: '#5cfd80',
        },
        'on-secondary': {
          DEFAULT: '#cfffce',
          fixed: '#004819',
          'fixed-variant': '#006827',
          container: '#005d22',
        },

        // Tertiary - 黄色系
        tertiary: {
          DEFAULT: '#6d5a00',
          dim: '#5f4e00',
          fixed: '#fdd400',
          'fixed-dim': '#edc600',
          container: '#fdd400',
        },
        'on-tertiary': {
          DEFAULT: '#fff2ce',
          fixed: '#433700',
          'fixed-variant': '#645300',
          container: '#594a00',
        },

        // Error - 红色系
        error: {
          DEFAULT: '#b31b25',
          dim: '#9f0519',
          container: '#fb5151',
        },
        'on-error': {
          DEFAULT: '#ffefee',
          container: '#570008',
        },

        // Surface - 背景色系
        surface: {
          DEFAULT: '#f7f5ff',
          dim: '#cdd1ff',
          bright: '#f7f5ff',
          tint: '#0053ca',
          variant: '#d8daff',
          container: '#e6e6ff',
          'container-low': '#f0efff',
          'container-lowest': '#ffffff',
          'container-high': '#dfe0ff',
          'container-highest': '#d8daff',
        },
        'on-surface': {
          DEFAULT: '#262c51',
          variant: '#545981',
        },

        // Inverse
        'inverse-surface': '#05092f',
        'inverse-on-surface': '#959ac6',
        'inverse-primary': '#5a8cff',

        // Outline
        outline: {
          DEFAULT: '#6f749e',
          variant: '#a5aad7',
        },

        // Background
        background: '#f7f5ff',
        'on-background': '#262c51',
      },

      // Font Family
      fontFamily: {
        headline: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        label: ['Manrope', 'system-ui', 'sans-serif'],
      },

      // Border Radius - Material Design 3
      borderRadius: {
        DEFAULT: '1rem',
        sm: '0.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        full: '9999px',
      },

      // Spacing tokens
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '80': '20rem',
      },

      // Box Shadow - Material Design 3 elevation
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(38, 44, 81, 0.3), 0 1px 3px 1px rgba(38, 44, 81, 0.15)',
        'elevation-2': '0 1px 2px rgba(38, 44, 81, 0.3), 0 2px 6px 2px rgba(38, 44, 81, 0.15)',
        'elevation-3': '0 4px 8px 3px rgba(38, 44, 81, 0.15), 0 1px 3px rgba(38, 44, 81, 0.3)',
        'card': '0 20px 40px rgba(38, 44, 81, 0.04)',
        'card-hover': '0 20px 40px rgba(38, 44, 81, 0.08)',
        'nav': '0 -10px 30px rgba(38, 44, 81, 0.04)',
        'header': '0 20px 40px rgba(38, 44, 81, 0.06)',
      },

      // Animation
      animation: {
        'scale-in': 'scale-in 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
