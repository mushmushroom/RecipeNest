'use client';
import { CustomButton } from '@/components/common/CustomButton';
import { Center, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import GlobalContainer from '@/components/GlobalContainer';

export default function error() {
  return (
    <GlobalContainer>
      <Center
        minHeight="60vh"
        flexDirection="column"
        gap="1.6rem"
        paddingY="2rem"
        textAlign="center"
      >
        <Heading as="h1" size="h2">
          500 - Server Error
        </Heading>
        <Text>Something went wrong...</Text>
        <Image src="/not-found-img.jpg" alt="Not Found" width={300} height={300} />
        <CustomButton asChild>
          <Link href="/">Return Home</Link>
        </CustomButton>
      </Center>
    </GlobalContainer>
  );
}
