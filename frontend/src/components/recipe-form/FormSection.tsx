'use client';

import { Box, BoxProps, Heading, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormSectionProps extends BoxProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children, ...rest }: FormSectionProps) {
  return (
    <Box p={{ base: '1.6rem', md: '2.4rem' }} {...rest}>
      <Heading as="h2" size="h2">
        {title}
      </Heading>
      <Stack gap="1.6rem" mt="2.4rem">
        {children}
      </Stack>
    </Box>
  );
}
