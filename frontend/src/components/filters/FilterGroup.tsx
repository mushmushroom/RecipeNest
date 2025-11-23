import { Box, CheckboxGroup, Heading, Text, Checkbox, Stack } from '@chakra-ui/react';
interface FilterGroupProps {
  title: string;
  options: string[];
}

export default function FilterGroup({ title, options }: FilterGroupProps) {
  return (
    <Box paddingY="3.2rem">
      <Heading size="h3" as="h3" marginBottom="2.3rem">
        {title}
      </Heading>
      <CheckboxGroup>
        <Stack gap="13px">
          {options.map((item) => (
            <Checkbox.Root
              key={item}
              value={item}
              colorPalette="brand.500"
              gap="12px"
              cursor="pointer"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                boxSize="20px"
                _checked={{
                  bg: 'brand.500',
                  borderColor: 'white',
                }}
              />
              <Checkbox.Label fontSize="1.8rem">{item}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}
