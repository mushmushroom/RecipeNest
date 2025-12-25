import { Heading, Stack, Flex, Text } from '@chakra-ui/react';
import CustomFormField from '../common/CustomFormField';
import { CustomButton } from '../common/CustomButton';
import useChangePassword from '@/lib/hooks/settings/useChangePassword';

interface ChangeEmailSectionProps {
  userEmail: string | undefined;
}
export default function ChangeEmailSection({ userEmail }: ChangeEmailSectionProps) {
  // const { register, handleSubmit, errors, isSubmitting, changePassword } = useChangePassword();
  return (
    <Stack gap="3rem" py="5rem">
      <Heading as="h2" size="h3">
        Change email
      </Heading>
      <Flex gap="2rem">
        <Text>Current email: </Text>
        <Text fontWeight="600">{userEmail}</Text>
      </Flex>
      <Stack
        gap="2rem"
        as="form"
        maxW="56rem"
        width="100%"
        alignItems="center"
        // onSubmit={handleSubmit(changePassword)}
      >
        <CustomFormField
          label="New email"
          id="newEmail"
          required
          // registration={register('newEmail', { required: true })}
          // error={errors.newEmail}
        />
        <CustomButton variant="secondary"
          // disabled={isSubmitting}
          type="submit">
          Update
        </CustomButton>
      </Stack>
    </Stack>
  );
}
