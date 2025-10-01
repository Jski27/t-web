/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#14f1ff',
        dark: '#06070d',
        accent: '#ff007a'
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 5px #14f1ff, 0 0 20px #14f1ff'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 20% 30%, rgba(20,241,255,0.15), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,0,122,0.12), transparent 65%)'
      }
    },
  },
  plugins: [],
};
