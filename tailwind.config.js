/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Blue palette
        'dark-blue': {
          '50': '#ebf1ff',
          '100': '#dae6ff',
          '200': '#bdcfff',
          '300': '#94aeff',
          '400': '#6a80ff',
          '500': '#4854ff',
          '600': '#2b28ff',
          '700': '#221ce6',
          '800': '#1e1bbf',
          '900': '#1e1f91',
          '950': '#131254',
        },
        // Grenadier palette
        'grenadier': {
          '50': '#fff4ed',
          '100': '#fee7d6',
          '200': '#fcccac',
          '300': '#faa877',
          '400': '#f77940',
          '500': '#f4561b',
          '600': '#d53810',
          '700': '#be2b10',
          '800': '#972415',
          '900': '#7a2014',
          '950': '#420d08',
        },
        // Forest Green palette
        'forest-green': {
          '50': '#eaffe6',
          '100': '#d2fec9',
          '200': '#a9fc9a',
          '300': '#72f75f',
          '400': '#45ec2f',
          '500': '#23d210',
          '600': '#15a808',
          '700': '#14880c',
          '800': '#14650f',
          '900': '#145512',
          '950': '#042f04',
        },
        // Voodoo palette
        'voodoo': {
          '50': '#fcf7fc',
          '100': '#f9eef9',
          '200': '#f1dcf2',
          '300': '#e7c0e7',
          '400': '#d89ad8',
          '500': '#c372c2',
          '600': '#a653a3',
          '700': '#894285',
          '800': '#70386c',
          '900': '#5a3056',
          '950': '#3b1738',
        },
        // Waterloo palette
        'waterloo': {
          '50': '#f4f6f9',
          '100': '#eceef3',
          '200': '#dce0e9',
          '300': '#c6ccdb',
          '400': '#aeb4cb',
          '500': '#999ebb',
          '600': '#787aa1',
          '700': '#707292',
          '800': '#5c5d77',
          '900': '#4e5061',
          '950': '#2d2d39',
        },
        // Wattle palette
        'wattle': {
          '50': '#f9fbeb',
          '100': '#f3f7ca',
          '200': '#e9ef99',
          '300': '#e2e557',
          '400': '#ddda32',
          '500': '#cec324',
          '600': '#b19c1d',
          '700': '#8e731a',
          '800': '#765c1d',
          '900': '#654d1e',
          '950': '#3a290e',
        },
        // Legacy colors for compatibility
        primary: {
          50: '#ebf1ff',
          100: '#dae6ff',
          200: '#bdcfff',
          300: '#94aeff',
          400: '#6a80ff',
          500: '#4854ff',
          600: '#2b28ff',
          700: '#221ce6',
          800: '#1e1bbf',
          900: '#1e1f91',
          950: '#131254',
        },
        // Dark mode specific
        dark: {
          bg: '#0D1117',
          text: '#F5F7FA',
          border: '#1F2937',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Electrolize', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backgroundImage: {
        'grid-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      // CSS variables could be used too; here we map utility classes to data attributes
      variants: {
      },
    },
  },
  plugins: [],
};