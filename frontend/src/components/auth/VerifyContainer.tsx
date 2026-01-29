'use client';
import { Center, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';
import { Toaster } from '@/components/ui/toaster';
import useVerify from '@/lib/hooks/auth/useVerify';

export default function VerifyContainer() {
  const {
    handleSubmit,
    register,
    errors,
    mutationVerify,
    mutationRequest,
    requestOtp,
    onSubmit,
    cooldown,
  } = useVerify();

  return (
    <Center minH="100vh" bgImage="url(/verify-img.jpg)" bgRepeat="no-repeat" bgSize="cover">
      <Container maxW="678px" py="5.3rem" px={{ base: '1.5rem', md: '4.8rem' }} bgColor="white">
        <Stack gap="2.2rem" alignItems="center">
          <Heading as="h1" size="h1">
            <Text as="span">Verify</Text> your account
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
              registration={register('otp', { required: true })}
              error={errors.otp}
              label="Code from email"
              id="otp-code"
              placeholder="Enter your code"
              required
            />
            {errors.root && (
              <Text color="red.500" fontSize="1.6rem">
                {errors.root.message}
              </Text>
            )}
            <CustomButton variant="secondary" type="submit" disabled={mutationVerify.isPending}>
              {mutationVerify.isPending ? 'Checking...' : 'Confirm'}
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
          <CustomButton
            variant="link"
            color="brand.500"
            onClick={requestOtp}
            disabled={cooldown > 0 || mutationRequest.isPending}
          >
            Request new code
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
