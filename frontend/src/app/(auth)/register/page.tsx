'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import { Toaster } from '@/components/ui/toaster';
import { AppPathPublic } from '@/lib/constants';
import useRegister from '@/lib/hooks/useRegister';
import { Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function RegisterPage() {
  const { handleSubmit, register, onSubmit, errors, mutation } = useRegister();
  return (
    <Center minH="100vh" bgImage="url(/register-img.jpg)" bgRepeat="no-repeat" bgSize="cover">
      <Container maxW="678px" py="5.3rem" px={{ base: '1.5rem', md: '4.8rem' }} bgColor="white">
        <Stack gap="2.2rem" alignItems="center">
          <Heading as="h1" size="h1">
            <Text as="span">Create</Text> a new account
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
              registration={register('username', { required: true })}
              error={errors.username}
              label="Username"
              id="username"
              placeholder="John Doe"
              required
            />
            <CustomFormField
              registration={register('email', { required: true })}
              error={errors.email}
              label="E-mail"
              id="email"
              placeholder="johndoe@email.com"
              required
            />
            <CustomFormField
              registration={register('password', { required: true })}
              error={errors.password}
              label="Password"
              id="password"
              required
              passwordField
            />
            <CustomFormField
              registration={register('confirmPassword', { required: true })}
              error={errors.confirmPassword}
              label="Confirm password"
              id="confirmPassword"
              required
              passwordField
            />
            {errors.root && (
              <Text color="red.500" fontSize="1.6rem">
                {errors.root.message}
              </Text>
            )}
            <CustomButton variant="secondary" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Processing...' : 'Create account'}
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
            <Link href={AppPathPublic.Login}>Log in to account</Link>
          </CustomButton>
          <CustomButton variant="link" asChild>
            <Link href={AppPathPublic.Recipes}>Back to all recipes</Link>
          </CustomButton>
        </Flex>
        <Toaster />
      </Container>
    </Center>
  );
}
