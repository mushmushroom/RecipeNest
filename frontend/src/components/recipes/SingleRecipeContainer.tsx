import { Box, Flex, Heading, Text, Separator, Stack, List } from '@chakra-ui/react';
import GlobalContainer from '../GlobalContainer';
import { CustomButton } from '../common/CustomButton';
import { FaPrint, FaRegBookmark } from 'react-icons/fa';
import RecipeImageSlider from './RecipeImageSlider';
import { ImageData } from '@/lib/types/recipe';

const testImages: ImageData[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764337170/recipes/8/d704e075-08e2-4955-86f3-6cc7f739eff2.jpg',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764337179/recipes/8/8fd1fc55-aa38-4288-bcad-9d1521b99a19.jpg',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764502356/recipes/8/15cdd94f-116c-4e5d-9733-bc4b9ffdd4f7.jpg',
  },
];

export default function SingleRecipeContainer() {
  return (
    <Box as="section" paddingTop="2rem" paddingBottom="4rem">
      <GlobalContainer>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '3rem', md: '5rem' }}
          marginBottom="5rem"
        >
          <Box flex="1">
            <Heading as="h1" size="h1" marginBottom="2rem">
              Orange Cranberry Ricotta Cookies
            </Heading>
            {/* User & date */}
            <Flex
              fontSize="1.8rem"
              gap="2rem"
              alignItems={{ base: 'flex-start', lg: 'center' }}
              marginBottom="3rem"
              direction={{ base: 'column', lg: 'row' }}
            >
              <Text>
                By{' '}
                <Text as="span" fontStyle="italic" fontWeight="600">
                  username123
                </Text>
              </Text>
              <Separator orientation="vertical" height="10" borderColor="gray.400" hideBelow="lg" />
              <Text color="gray.400">Published on November 7, 2025</Text>
            </Flex>
            {/* Buttons */}
            <Flex marginBottom="3rem" gap="2.5rem">
              <CustomButton variant="secondary">
                <FaRegBookmark />
                Save
              </CustomButton>
              <CustomButton variant="outline">
                <FaPrint />
                Print
              </CustomButton>
            </Flex>
            {/* Recipe general info */}
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
                <Text width="15rem" color="gray.500">
                  Difficulty
                </Text>
                <Text>Easy</Text>
              </Flex>
              <Flex>
                <Text width="15rem" color="gray.500">
                  Cooking time
                </Text>
                <Text>22 min</Text>
              </Flex>
            </Stack>
          </Box>
          {/* Slider */}
          <Box flex="1" maxW={{ base: '100%', md: '45%' }}>
            {testImages.length > 0 ? (
              <RecipeImageSlider images={testImages} />
            ) : (
              <Box
                display={{ base: 'none', md: 'flex' }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
                backgroundColor="gray.300"
              >
                <Text>No image</Text>
              </Box>
            )}
          </Box>
        </Flex>
        {/* Ingredients */}
        <Box marginBottom="5rem">
          <Heading size="h2" as="h2" marginBottom="1.5rem">
            Ingredients
          </Heading>
          <List.Root gap="2" variant="plain" align="center" paddingLeft="1rem">
            <List.Item alignItems="center" gap="1.5rem">
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </List.Item>
          </List.Root>
        </Box>

        {/* Cooking instructions */}
        <Box marginBottom="6rem">
          <Heading size="h2" as="h2" marginBottom="1.5rem">
            Cooking instructions
          </Heading>
          <List.Root gap="2" variant="plain">
            <List.Item alignItems="center" display="block">
              <List.Indicator
                display="block"
                color="brand.500"
                fontSize="2.2rem"
                fontWeight="600"
                fontFamily="heading"
              >
                Step 1
              </List.Indicator>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </List.Item>
          </List.Root>
        </Box>

        {/* That't it */}
        <Text fontSize="3rem" fontWeight="600" textAlign="center" fontFamily="heading">
          That’s it! Enjoy your meal!
        </Text>
      </GlobalContainer>
    </Box>
  );
}
