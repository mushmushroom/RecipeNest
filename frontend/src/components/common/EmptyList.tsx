import { Text } from '@chakra-ui/react';

interface EmptyListProps {
  message?: string;
}
export default function EmptyList({ message = "There are no recipes added at the moment." }: EmptyListProps) {
  return <Text textAlign="center" fontStyle="italic" fontSize="1.7rem" color="gray.400">{message}</Text>;
}
