import { IngredientData } from '@/lib/types/recipe';
import { Box, Heading, List } from '@chakra-ui/react';
interface IngredientsSingleSectionProps {
  ingredients: IngredientData[];
}
export default function IngredientsSingleSection({ ingredients }: IngredientsSingleSectionProps) {
  return (
    <>
      <Heading size="h2" as="h2" marginBottom="1.5rem">
        Ingredients
      </Heading>
      <List.Root gap="2" variant="plain" align="center" paddingLeft="1rem">
        {ingredients.map((ingredient) => (
          <List.Item
            alignItems="center"
            gap="1.5rem"
            key={ingredient.id}
            fontSize="1.8rem"
            marginBottom="0.5rem"
          >
            <List.Indicator
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Box
                width="12px"
                height="12px"
                borderRadius="50%"
                backgroundColor="brand.400"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              />
              <Box
                width="8px"
                height="8px"
                borderRadius="50%"
                backgroundColor="brand.500"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              />
            </List.Indicator>
            {ingredient.name} - {ingredient.amount} {ingredient.unit}
          </List.Item>
        ))}
      </List.Root>
    </>
  );
}
