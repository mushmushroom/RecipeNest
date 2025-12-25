'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import ChangeEmailSection from '@/components/settings/ChangeEmailSection';
import ChangePasswordSection from '@/components/settings/ChangePasswordSection';
import ChangeUsernameSection from '@/components/settings/ChangeUsernameSection';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/lib/hooks/useAuth';
import { Box, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function SettingsPage() {
  const { userEmail, username } = useAuth(true);
  return (
    <Box>
      <Heading as="h1" size="h2" textAlign="center">
        Account settings
      </Heading>
      {/* Change avatar */}
      <Flex gap="3rem" alignItems="center" py="5rem">
        <Image src="/user-avatar.jpg" width={137} height={137} alt="User avatar" />
        <CustomButton variant="outline">Select new avatar</CustomButton>
      </Flex>

      <Separator borderColor="gray.400" />
      {/* */}
      <ChangeUsernameSection username={username} />

      <Separator borderColor="gray.400" />

      {/* Change email */}
      <ChangeEmailSection userEmail={userEmail} />

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
        <CustomButton variant="danger">Delete my account</CustomButton>
      </Stack>

      <Toaster />
    </Box>
  );
}
