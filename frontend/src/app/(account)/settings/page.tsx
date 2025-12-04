'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import { useAuth } from '@/lib/hooks/useAuth';
import { Box, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function SettingsPage() {
  const { userEmail } = useAuth(true);
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

      {/* Change email */}
      <Stack gap="3rem" py="5rem">
        <Heading as="h2" size="h3">
          Change email
        </Heading>
        <Flex gap="2rem">
          <Text>Current email: </Text>
          <Text fontWeight="600">{userEmail}</Text>
        </Flex>
        <Box as="form" display="flex" alignItems="flex-end" gap="2.6rem" maxW="56rem" width="100%">
          <CustomFormField label="New email" id="newEmail" />
          <CustomButton variant="secondary">Update</CustomButton>
        </Box>
      </Stack>

      <Separator borderColor="gray.400" />

      {/* Change password */}
      <Stack gap="3rem" py="5rem">
        <Heading as="h2" size="h3">
          Change password
        </Heading>
        <Stack gap="2rem" as="form" maxW="56rem" width="100%" alignItems="center">
          <CustomFormField label="Old password" id="oldPassword" required />
          <CustomFormField label="New password" id="newPassword" required />
          <CustomFormField label="Confirm new password" id="confirmNewPassword" required />
          <CustomButton variant="secondary">Update</CustomButton>
        </Stack>
      </Stack>

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
    </Box>
  );
}
