module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#b537f2',
          pink: '#ff006e',
          cyan: '#00f5ff',
          blue: '#0080ff',
          green: '#39ff14',
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #1a0033 0%, #2d0055 50%, #1a0033 100%)',
        'gradient-neon': 'linear-gradient(135deg, #b537f2 0%, #ff006e 50%, #00f5ff 100%)',
      }
    },
  },
  plugins: [],
}
