import { Flex, Box, Heading, Text, Stack } from '@chakra-ui/react';
import GlobalContainer from '../GlobalContainer';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box as="section" bgColor="white">
      <GlobalContainer>
        <Flex alignItems="center" gap="10rem">
          <Stack paddingY={{ base: '3rem', md: '2rem' }}>
            <Heading as="h1" size="h1" lineHeight="1.2" marginBottom="13px">
              Discover and share
              <Text as="span" display="block" color="green.400">
                delicious recipes
              </Text>
            </Heading>
            <Text fontSize="2rem">Upload your favorite dishes and explore others’ creations</Text>
          </Stack>
          <Box position="relative" width="100%" minHeight="362px" hideBelow="md">
            <Image src="/home-img.jpg" alt="Steak on a plate" fill style={{ objectFit: 'cover' }} />
          </Box>
        </Flex>
      </GlobalContainer>
    </Box>
  );
}
