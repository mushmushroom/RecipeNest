'use client';
import UserAvatarBox from '@/components/account/UserAvatarBox';
import { CustomButton } from '@/components/common/CustomButton';
import ErrorMessage from '@/components/ErrorMessage';
import ChangeAvatarSection from '@/components/settings/ChangeAvatarSection';
import ChangeEmailSection from '@/components/settings/ChangeEmailSection';
import ChangePasswordSection from '@/components/settings/ChangePasswordSection';
import ChangeUsernameSection from '@/components/settings/ChangeUsernameSection';
import DeleteAccountDialog from '@/components/settings/DeleteAccountDialog';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/lib/hooks/useAuth';
import { useProfileData } from '@/lib/hooks/useProfileQuery';
import { Box, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function SettingsPage() {
  const { data, isLoading, isError } = useProfileData();
  console.log(data);
  if (isLoading) return 'Loading data..';
  if (isError) return <ErrorMessage message="Profile data cannot be loaded" />;

  return (
    <Box>
      <Heading as="h1" size="h2" textAlign="center">
        Account settings
      </Heading>
      {/* Change avatar */}
      <ChangeAvatarSection url={data?.avatar[0]?.url} />

      <Separator borderColor="gray.400" />
      {/* */}
      <ChangeUsernameSection username={data?.username} />

      <Separator borderColor="gray.400" />

      {/* Change email */}
      <ChangeEmailSection userEmail={data?.email} />

      <Separator borderColor="gray.400" />

      {/* Change password */}
      <ChangePasswordSection />

      <Separator borderColor="gray.400" />

      {/* Delete account */}
      <Stack gap="3rem" py="5rem" alignItems="flex-start">
        <Heading as="h2" size="h3">
          Delete account
        </Heading>
        <Text>
          If you delete your account, all your recipes and personal data will be permanently
          removed. This action can’t be undone, and your information will not be recoverable.
        </Text>
        <DeleteAccountDialog />
      </Stack>

      <Toaster />
    </Box>
  );
}
