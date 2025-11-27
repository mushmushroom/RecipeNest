import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    display: 'flex',
    gap: '1rem',
    paddingX: '3rem',
    paddingY: '1rem',
    borderRadius: '10px',
    fontSize: '2rem',
    cursor: 'pointer',
    transition: 'opacity 0.4s',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      color: 'gray.600',
    },
    '&:hover': {
      opacity: 0.6,
    },
  },
  variants: {
    variant: {
      main: { bg: 'brand.500', color: 'black' },
      secondary: { bg: 'green.400', color: 'black' },
      danger: { bgColor: 'red', color: 'white' },
      outline: { borderWidth: '1px', borderColor: 'black', backgroundColor: 'white' },
      link: { fontSize: '1.8rem', gap: '8px', fontWeight: '500' },
    },
    size: {
      sm: { paddingX: '0.5rem', paddingY: '1rem', fontSize: '1.6rem' },
      md: { paddingX: '2rem', paddingY: '1rem' },
      lg: { paddingX: '3rem', paddingY: '1rem' },
    },
  },
  defaultVariants: {
    variant: 'main',
    size: 'lg',
  },
});
