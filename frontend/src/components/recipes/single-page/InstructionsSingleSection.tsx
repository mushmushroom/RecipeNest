import { InstructionData } from '@/lib/types/recipe';
import { Heading, List } from '@chakra-ui/react';

interface InstructionsSingleSectionProps {
  instructions: InstructionData[];
}
export default function InstructionsSingleSection({
  instructions,
}: InstructionsSingleSectionProps) {
  return (
    <>
      <Heading size="h2" as="h2" marginBottom="1.5rem">
        Cooking instructions
      </Heading>
      <List.Root gap="2" variant="plain">
        {instructions.map((instruction) => (
          <List.Item
            alignItems="center"
            display="block"
            key={instruction.id}
            fontSize="1.8rem"
            marginBottom="2rem"
          >
            <List.Indicator
              display="block"
              color="brand.500"
              fontSize="2.2rem"
              fontWeight="600"
              fontFamily="heading"
              lineHeight="1.2"
              // minHeight="1lh"
              marginBottom="0.5rem"
            >
              Step {instruction.step}
            </List.Indicator>
            {instruction.description}
          </List.Item>
        ))}
      </List.Root>
    </>
  );
}
