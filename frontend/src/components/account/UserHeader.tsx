import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import { AppPathProtected } from '@/lib/constants';
import { useProfileData } from '@/lib/hooks/useProfileQuery';
import UserAvatarBox from './UserAvatarBox';

export default function UserHeader() {
  const { data } = useProfileData();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      gap="3rem"
      flexWrap="wrap"
      paddingBottom="5rem"
    >
      <Flex gap="2.8rem" alignItems="flex-end">
        {/* <Image
          src={data?.avatar[0] ? data?.avatar[0].url : '/user-avatar.jpg'}
          width={137}
          height={137}
          alt="User avatar"
        /> */}
        <UserAvatarBox url={data?.avatar[0]?.url} />
        <Box>
          <Text fontSize="2.2rem" fontWeight="600" fontStyle="italic">
            {data?.username || 'User Name'}
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
