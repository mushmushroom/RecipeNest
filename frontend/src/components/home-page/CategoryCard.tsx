import { AppPathPublic } from '@/lib/constants';
import { Box, Center, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface CategoryCardProps {
  category: {
    text: string;
    img: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`${AppPathPublic.Recipes}?category=${category.text}`}>
      <Center
        as="article"
        bgImage={`url(${category.img})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        backgroundPosition="center"
        height="190px"
        borderRadius="10px"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          p="4"
        ></Box>
        <Text color="white" fontWeight="700" fontSize="2.2rem" zIndex="2">
          {category.text}
        </Text>
      </Center>
    </Link>
  );
}
