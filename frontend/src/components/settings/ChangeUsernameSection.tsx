import { Heading, Stack, Flex, Text } from '@chakra-ui/react';
import CustomFormField from '../common/CustomFormField';
import { CustomButton } from '../common/CustomButton';
import useChangeUsername from '@/lib/hooks/settings/useChangeUsername';

interface ChangeEmailSectionProps {
  username: string | undefined;
}
export default function ChangeUsernameSection({ username }: ChangeEmailSectionProps) {
  const { register, handleSubmit, errors, isSubmitting, changeUsername } = useChangeUsername();
  return (
    <Stack gap="3rem" py="5rem">
      <Heading as="h2" size="h3">
        Change username
      </Heading>
      <Flex gap="2rem">
        <Text>Current username: </Text>
        <Text fontWeight="600">{username}</Text>
      </Flex>
      <Stack
        gap="2rem"
        as="form"
        maxW="56rem"
        width="100%"
        alignItems="center"
        onSubmit={handleSubmit(changeUsername)}
      >
        <CustomFormField
          label="New username"
          id="newUsername"
          required
          registration={register('username', { required: true })}
          error={errors.username}
        />
        <CustomButton variant="secondary" disabled={isSubmitting} type="submit">
          Update
        </CustomButton>
      </Stack>
    </Stack>
  );
}
