import { Box, Heading, Flex, Text, Badge } from '@chakra-ui/react';
import Image from 'next/image';
import { IoTimeOutline } from 'react-icons/io5';

const difficultyColors = {
  EASY: { bg: 'green.300', text: 'green.500' },
  MEDIUM: { bg: 'yellow.300', text: 'yellow.500' },
  HARD: { bg: 'red.400', text: 'red.500' },
} as const;

interface RecipeCardProps {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}
export default function RecipeCard({ difficulty }: RecipeCardProps) {
  return (
    <Box
      as="article"
      borderRadius="10px"
      overflow="hidden"
      maxW="320px"
      borderColor="gray.300"
      borderWidth="1px"
    >
      <Box position="relative" width="100%" height="160px">
        <Image src="/verify-img.jpg" alt="Image" fill style={{ objectFit: 'cover' }} />
      </Box>
      <Box p="1.5rem">
        <Heading as="h3" size="cardTitle">
          Cheese spread
        </Heading>
        <Flex alignItems="center" justifyContent="space-between" mt="5px">
          <Flex alignItems="center">
            <IoTimeOutline color="gray.500" size={14} />
            <Text color="gray.500" fontSize="13px">
              25 min
            </Text>
          </Flex>
          <Badge
            backgroundColor={difficultyColors[difficulty].bg}
            color={difficultyColors[difficulty].text}
            fontSize="13px"
            paddingX="1rem"
            paddingY="5px"
            borderRadius="6px"
          >
            {difficulty.toLowerCase()}
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
}
