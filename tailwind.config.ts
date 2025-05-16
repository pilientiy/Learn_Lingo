import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-color': '#ffffff',
        'text-color-main': '#121417',
        'text-color-muted': 'rgba(18, 20, 23, 0.7)',
        'pale-black': 'rgba(18, 20, 23, 0.2)',
        'text-color-gray': '#8a8a89',
        'pastel-red': '#fceeed',
        black: '#121417',
        white: '#ffffff',
        guyabano: '#f8f8f8',
        gray: '#8a8a89',
        red: '#e0a39a',
        'light-red': '#f2c0bd',
        green: '#38cd3e',
        gold: '#ffc531',
        'backdrop-mobile-menu': 'rgba(242, 193, 189, 0.7)',
      },
    },
    screens: {
      sm: { max: '768px' },
      // => @media (max-width: 768px) { ... }

      md: { min: '769px' },
      // => @media (min-width: 769px) { ... }

      lg: { min: '1060px' },
      // => @media (min-width: 1060px) { ... }
    },
  },
  plugins: [],
};
export default config;
