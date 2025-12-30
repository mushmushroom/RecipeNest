import { defineRecipe } from '@chakra-ui/react';

export const headingRecipe = defineRecipe({
  variants: {
    size: {
      h1: {
        fontSize: '4rem',
        color: 'black',
        fontWeight: '700',
        lineHeight: '1.2',
        '& span': {
          color: 'brand.500',
        },
      },
      h2: {
        fontSize: '3rem',
        color: 'black',
        lineHeight: '1.2',
        '& span': {
          color: 'brand.500',
        },
      },
      h3: {
        fontSize: '2.2rem',
        color: 'black',
        lineHeight: '1.2',
        '& span': {
          color: 'brand.500',
        },
      },
      cardTitle: {
        fontFamily: 'body',
        fontSize: '2.2rem',
        color: 'black',
        lineHeight: '1.2',
      },
    },
  },
});
