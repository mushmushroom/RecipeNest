import { Center, Text } from "@chakra-ui/react";
import { CustomButton } from "./common/CustomButton";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
export default function ErrorMessage({ message = "Something went wrong", onRetry }: ErrorMessageProps) {
  return (
    <Center paddingX="2rem" paddingY="4rem" flexDirection="column" gap="1.6rem">
      <Text>{message}</Text>
      {onRetry && (
        <CustomButton variant="danger" onClick={onRetry} style={{ marginLeft: '1rem' }}>
          Retry
        </CustomButton>
      )}
    </Center>
  )
}
