import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { withTV } from 'tailwind-variants/transformer';
import TailwindAnimate from 'tailwindcss-animate';
// @ts-ignore
import TailwindMaskImage from 'tailwind-gradient-mask-image';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono]
      },

      keyframes: {
        'cursor-blink': {
          '0%, 60%': {
            opacity: '1'
          },

          '70%, 100%': {
            opacity: '0'
          }
        },

        'text-blink': {
          '0%, 60%': {
            color: 'var(--primary)'
          },

          '70%, 100%': {
            color: 'var(--background)'
          }
        }
      },

      animation: {
        'cursor-blink': 'cursor-blink .7s  infinite step-start',
        'text-blink': 'text-blink .7s  infinite step-start'
      },

      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        error: 'var(--error)'
      }
    }
  },

  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('child-group-hover', '& > *:group-hover');
    }),

    plugin(function ({ addUtilities }) {
      addUtilities({
        '.horizontal': {
          display: 'flex',
          flexDirection: 'row'
        },

        '.horizontal.center-v': {
          alignItems: 'center'
        },

        '.horizontal.center-h': {
          justifyContent: 'center'
        },

        '.horizontal.center': {
          justifyContent: 'center',
          alignItems: 'center'
        },

        '.vertical': {
          display: 'flex',
          flexDirection: 'column'
        },

        '.vertical.center-v': {
          justifyContent: 'center'
        },

        '.vertical.center-h': {
          alignItems: 'center'
        },

        '.vertical.center': {
          justifyContent: 'center',
          alignItems: 'center'
        },

        '.space-between': {
          justifyContent: 'space-between'
        }
      });
    }),

    TailwindAnimate,
    TailwindMaskImage
    // require('tailwindcss-animate')
  ]
};

export default withTV(config);
