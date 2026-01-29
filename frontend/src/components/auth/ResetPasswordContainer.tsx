'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import { Toaster } from '@/components/ui/toaster';
import { AppPathPublic } from '@/lib/constants';
import useReset from '@/lib/hooks/auth/useReset';
import { Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';



export default function ResetPasswordContainer() {
  const { handleSubmit, onSubmit, register, errors } = useReset();
  return (
    <Center minH="100vh" bgImage="url(/reset-img.jpg)" bgRepeat="no-repeat" bgSize="cover">
      <Container maxW="678px" py="5.3rem" px={{ base: '1.5rem', md: '4.8rem' }} bgColor="white">
        <Stack gap="2.2rem" alignItems="center">
          <Heading as="h1" size="h1">
            <Text as="span">Reset</Text> your password
          </Heading>
          <Stack
            as="form"
            gap="16px"
            maxW="412px"
            w="100%"
            alignItems="center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomFormField
              registration={register('password', { required: true })}
              error={errors.password}
              label="Enter new password"
              id="password"
              placeholder="******"
              required
              passwordField
            />
            <CustomFormField
              registration={register('confirmPassword', { required: true })}
              error={errors.confirmPassword}
              label="Confirm password"
              id="confirmPassword"
              placeholder="******"
              required
              passwordField
            />
            {errors.root && (
              <Text color="red.500" fontSize="1.6rem">
                {errors.root.message}
              </Text>
            )}
            <CustomButton variant="secondary" type="submit">
              Update password
            </CustomButton>
          </Stack>
        </Stack>
        <Flex
          justifyContent={{ base: 'center', md: 'space-between' }}
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          gap={{ base: '1.5rem', md: '0' }}
          marginTop="2.5rem"
        >
          <CustomButton variant="link" asChild color="brand.500">
            <Link href={AppPathPublic.Login}>Go to login page</Link>
          </CustomButton>
          <CustomButton variant="link" asChild color="green.500">
            <Link href={AppPathPublic.ForgotPassword}>Request new link</Link>
          </CustomButton>
        </Flex>
        <CustomButton variant="link" asChild>
          <Link href={AppPathPublic.Recipes}>Back to all recipes</Link>
        </CustomButton>

        <Toaster />
      </Container>
    </Center>
  );
}

