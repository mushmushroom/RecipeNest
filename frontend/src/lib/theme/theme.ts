import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { buttonRecipe } from './button.recipe';
import { headingRecipe } from './heading.recipe';

const config = defineConfig({
  theme: {
    recipes: {
      heading: headingRecipe,
    },

    // breakpoints
    breakpoints: {
      xs: '0',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },

    tokens: {
      // sizes
      sizes: {
        xs: { value: '0' },
        sm: { value: '480px' },
        md: { value: '768px' },
        lg: { value: '1024px' },
        xl: { value: '1240px' },
      },

      // fonts
      fonts: {
        heading: { value: 'var(--font-montagu)' },
        body: { value: 'var(--font-nunito)' },
      },
      // color pallette
      colors: {
        brand: {
          '500': { value: '#FE8862' },
          '400': { value: '#FBD5B0' },
        },
        green: {
          '500': { value: '#418D0E' },
          '400': { value: '#B8DA98' },
          '300': { value: '#DCFFC7' },
        },

        yellow: {
          '500': { value: '#86810C' },
          '400': { value: '#F6EB15' },
          '300': { value: '#FFFDCF' },
        },

        red: {
          '500': { value: '#F25858' },
          '400': { value: '#FFD2D2' },
        },
        black: { value: '#1E1E1E' },
        gray: {
          '600': { value: '#32312F' },
          '500': { value: '#7B7A79' },
          '400': { value: '#9F9F9F' },
          '300': { value: '#D6D6D6' },
        },
        background: { value: '#FDFAF6' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
