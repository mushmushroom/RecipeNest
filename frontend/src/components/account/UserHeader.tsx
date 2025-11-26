import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import { AppPathProtected } from '@/lib/constants';

export default function UserHeader() {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      gap="3rem"
      flexWrap="wrap"
      paddingBottom="5rem"
    >
      <Flex gap="2.8rem" alignItems="flex-end">
        <Image src="/user-avatar.jpg" width={137} height={137} alt="User avatar" />
        <Box>
          <Text fontSize="2.2rem" fontWeight="600" fontStyle="italic">
            username123
          </Text>
          <Text fontSize="1.8rem" color="gray.400">
            Joined on November 20, 2025
          </Text>
        </Box>
      </Flex>
      <CustomButton variant="main" asChild>
        <Link href={AppPathProtected.AddRecipe}>Add recipe</Link>
      </CustomButton>
    </Flex>
  );
}
