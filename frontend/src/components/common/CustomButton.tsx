'use client';
import { buttonRecipe } from '@/lib/theme/button.recipe';
import { chakra, RecipeVariantProps, useRecipe } from '@chakra-ui/react';
type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  children: React.ReactNode;
  asChild?: boolean;
}
export const CustomButton = ({ children, asChild, variant, size, ...restProps }: ButtonProps) => {
  const recipe = useRecipe({ recipe: buttonRecipe });
  const styles = recipe({ variant, size });
  const Component = asChild ? chakra.span : chakra.button;
  return (
    <Component css={styles} {...restProps}>
      {children}
    </Component>
  );
};
