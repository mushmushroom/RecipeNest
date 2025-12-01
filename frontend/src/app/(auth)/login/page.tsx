'use client';
import { Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import { AppPathPublic } from '@/lib/constants';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import useLogin from '@/lib/hooks/auth/useLogin';

export default function SignInPage() {
  const { handleSubmit, register, errors, onSubmit } = useLogin();
  return (
    <Center minH="100vh" bgImage="url(/login-img.jpg)" bgRepeat="no-repeat" bgSize="cover">
      <Container maxW="678px" py="5.3rem" px={{ base: '1.5rem', md: '4.8rem' }} bgColor="white">
        <Stack gap="2.2rem" alignItems="center">
          <Heading as="h1" size="h1">
            <Text as="span">Log in</Text> to your account
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
            {errors.root && (
              <Text color="red.500" fontSize="1.6rem">
                {errors.root.message}
              </Text>
            )}
            <CustomButton variant="secondary" type="submit">
              Log in
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
            <Link href={AppPathPublic.Register}>Create new account</Link>
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
