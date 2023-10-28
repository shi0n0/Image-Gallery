import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'custom-pink': '#FF295E',
        'custom-pink-200': '#FFC0D0'
      },
      textColor: {
        'custom-pink': '#FF295E',
      },
      borderColor: {
        'custom-pink': '#FF295E',
      },
    },
  },
  plugins: [],
}
export default config
