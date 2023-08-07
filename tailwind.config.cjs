/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '0': '0px',
        'px': '1px',
        '0.5': '0.125em', // 2px
        '1': '0.25em', // 4px
        '1.5': '0.375em', // 6px
        '2': '0.5em', // 8px
        '2.5': '0.625em', // 10px
        '3': '0.75em', // 12px
        '3.5': '0.875em', // 14px
        '4': '1em', // 16px
        '5': '1.25em', // 20px
        '6': '1.5em', // 24px
        '7': '1.75em', // 28px
        '8': '2em', // 32px
        '9': '2.25em', // 36px
        '10': '2.5em', // 40px
        '11': '2.75em', // 44px
        '12': '3em', // 48px
        '14': '3.5em', // 56px
        '16': '4em', // 64px
        '20': '5em', // 80px
        '24': '6em', // 96px
        '28': '7em', // 112px
        '32': '8em', // 128px
        '36': '9em', // 144px
        '40': '10em', // 160px
        '44': '11em', // 176px
        '48': '12em', // 192px
        '52': '13em', // 208px
        '56': '14em', // 224px
        '60': '15em', // 240px
        '64': '16em', // 256px
        '72': '18em', // 288px
        '80': '20em', // 320px
        '96': '24em', // 384px
      },
      fontSize: {
        xs: '0.75em', // 12px
        sm: '0.875em', // 14px
        base: '1em', // 16px
        lg: '1.125em', // 18px
        xl: '1.25em', // 20px
        '2xl': '1.5em', // 24px
        '3xl': '1.875em', // 30px
        '4xl': '2.25em', // 36px
        '5xl': '3em', // 48px
        '6xl': '3.75em', // 60px
        '7xl': '4.5em', // 72px
        '8xl': '6em', // 96px
        '9xl': '8em', // 128px
      },
      lineHeight: {
        sm: '1.25em', // 20px
        base: '1.5em', // 24px
        lg: '1.75em', // 28px
        xl: '1.75em', // 28px
        '2xl': '2em', // 32px
        '3xl': '2.25em', // 36px
        '4xl': '2.5em', // 40px
        '5xl': '1',
        '6xl': '1',
        '7xl': '1',
        '8xl': '1',
        '9xl': '1',
      },
    },
  },
  plugins: [],
};
