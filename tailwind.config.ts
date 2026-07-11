import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // BioPC brand: science blue + purple accent (per brief), white base.
        brand: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#bcd2ff',
          300: '#8eb5ff',
          400: '#598cff',
          500: '#3563f0',
          600: '#1f45d6',
          700: '#1b37ad',
          800: '#1c318a',
          900: '#1c2e6e',
          950: '#131d43',
        },
        accent: {
          50: '#f4f1ff',
          100: '#ebe4ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#8344ff',
          600: '#7521f7',
          700: '#6415d8',
          800: '#5314af',
          900: '#45138c',
          950: '#2a0a5e',
        },
        teal: {
          400: '#22c9d6',
          500: '#12aebb',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #1f45d6 0%, #7521f7 100%)',
        'brand-radial': 'radial-gradient(60% 60% at 50% 0%, rgba(117,33,247,0.18) 0%, rgba(31,69,214,0) 100%)',
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(117, 33, 247, 0.45)',
        card: '0 10px 40px -12px rgba(19, 29, 67, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
