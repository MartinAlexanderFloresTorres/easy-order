/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1100px',
          xl: '1100px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'fade-out': 'fadeOut 02s ease-in-out',
      },
      height: {
        view: 'calc(100vh - 110px)',
        'tablet-view': 'calc(100vh - 158px)',
      },
    },
  },

  plugins: [],
};
