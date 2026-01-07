import { IngredientData, InstructionData, RecipeFull, RecipePreview } from '@/lib/types/recipe';
import { Box, Heading, Stack } from '@chakra-ui/react';
import IngredientsSingleSection from './IngredientsSingleSection';
import InstructionsSingleSection from './InstructionsSingleSection';

interface RecipePrintProps {
  title: string;
  ingredients: IngredientData[];
  instructions: InstructionData[];
}
export default function RecipePrint({ title, ingredients, instructions }: RecipePrintProps) {
  return (
    <Stack padding="3rem" width="100%" gap="3rem">
      <Heading as="h1" size="h1" textAlign="center">
        {title}
      </Heading>
      <Box>
        <IngredientsSingleSection ingredients={ingredients} />
      </Box>
      <Box>
        <InstructionsSingleSection instructions={instructions} />
      </Box>
    </Stack>
  );
}
