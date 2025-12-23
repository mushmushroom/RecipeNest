import { Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import CustomFormField from '../common/CustomFormField';
import { CustomButton } from '../common/CustomButton';
import useChangePassword from '@/lib/hooks/settings/useChangePassword';

export default function ChangePasswordSection() {
  const { register, handleSubmit, errors, isSubmitting, changePassword } = useChangePassword();
  return (
    <Stack gap="3rem" py="5rem">
      <Heading as="h2" size="h3">
        Change password
      </Heading>
      <Stack
        gap="2rem"
        as="form"
        maxW="56rem"
        width="100%"
        alignItems="center"
        onSubmit={handleSubmit(changePassword)}
      >
        <CustomFormField
          label="Old password"
          id="oldPassword"
          required
          registration={register('oldPassword', { required: true })}
          error={errors.oldPassword}
          passwordField
        />
        <CustomFormField
          label="New password"
          id="newPassword"
          required
          registration={register('newPassword', { required: true })}
          error={errors.newPassword}
          passwordField
        />
        <CustomFormField
          label="Confirm new password"
          id="confirmNewPassword"
          required
          registration={register('confirmPassword', { required: true })}
          error={errors.confirmPassword}
          passwordField
        />
        <CustomButton variant="secondary" disabled={isSubmitting} type="submit">
          Update
        </CustomButton>
      </Stack>
    </Stack>
  );
}
