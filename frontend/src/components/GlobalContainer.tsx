import { Container } from '@chakra-ui/react';

export default function GlobalContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container maxW="xl">{children}</Container>;
}
