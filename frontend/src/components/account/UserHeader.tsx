import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import { AppPathProtected } from '@/lib/constants';
import { useProfileData } from '@/lib/hooks/useProfileQuery';
import UserAvatarBox from './UserAvatarBox';
import { formatDate } from '@/lib/helpers/utils';

export default function UserHeader() {
  const { data, isLoading } = useProfileData();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-end"
      gap="3rem"
      flexWrap="wrap"
      paddingBottom="5rem"
    >
      <Flex gap="2.8rem" alignItems="flex-end">
        <UserAvatarBox url={data?.avatar[0]?.url} />
        {isLoading && <Spinner />}
        <Box>
          {data?.username && (
            <Text fontSize="2.2rem" fontWeight="600" fontStyle="italic">
              {data?.username}
            </Text>
          )}
          {data?.createdAt && (
            <Text fontSize="1.8rem" color="gray.400">
              Joined on {formatDate(data.createdAt)}
            </Text>
          )}
        </Box>
      </Flex>
      <CustomButton variant="main" asChild>
        <Link href={AppPathProtected.AddRecipe}>Add recipe</Link>
      </CustomButton>
    </Flex>
  );
}
