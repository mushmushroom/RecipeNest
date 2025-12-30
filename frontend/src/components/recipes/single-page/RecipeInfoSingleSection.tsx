import { formatMinutesToHours } from '@/lib/helpers/utils';
import { CookingTime, DifficultyOption } from '@/lib/types/recipe';
import { Stack, Flex, Text } from '@chakra-ui/react';

interface RecipeInfoSingleSectionProps {
  difficulty: DifficultyOption;
  cookingTime: number | CookingTime;
}
export default function RecipeInfoSingleSection({
  difficulty,
  cookingTime,
}: RecipeInfoSingleSectionProps) {
  const difficultyData = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
  const cookingTimeData =
    typeof cookingTime === 'object'
      ? `${cookingTime.amount} ${cookingTime.unit}`
      : formatMinutesToHours(cookingTime);
  return (
    <Stack
      gap="2rem"
      borderColor="brand.500"
      borderRadius="10px"
      borderWidth="2px"
      borderBottomWidth="1.5rem"
      paddingY="2.6rem"
      paddingX="2.5rem"
      backgroundColor="white"
      width="fit-content"
    >
      <Flex>
        <Text width="15rem" color="gray.500" fontSize="1.8rem">
          Difficulty
        </Text>
        <Text fontSize="1.8rem">{difficultyData}</Text>
      </Flex>
      <Flex>
        <Text width="15rem" color="gray.500" fontSize="1.8rem">
          Cooking time
        </Text>
        <Text fontSize="1.8rem">{cookingTimeData}</Text>
      </Flex>
    </Stack>
  );
}
