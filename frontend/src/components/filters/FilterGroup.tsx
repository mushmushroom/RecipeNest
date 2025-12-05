import { Box, CheckboxGroup, Heading, Checkbox, Stack } from '@chakra-ui/react';
interface FilterGroupProps<T> {
  title: string;
  options: T[];
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
}

export default function FilterGroup<T>({
  title,
  options,
  getValue,
  getLabel,
}: FilterGroupProps<T>) {
  return (
    <Box paddingY="3.2rem">
      <Heading size="h3" as="h3" marginBottom="2.3rem">
        {title}
      </Heading>
      <CheckboxGroup>
        <Stack gap="13px">
          {options.map((item) => {
            const value = getValue(item);
            return (
              <Checkbox.Root
                key={value}
                value={value}
                colorPalette="brand.500"
                gap="12px"
                cursor="pointer"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control
                  boxSize="20px"
                  cursor="pointer"
                  _checked={{
                    bg: 'brand.500',
                    borderColor: 'white',
                  }}
                />
                <Checkbox.Label fontSize="1.8rem" lineHeight="1.2">
                  {getLabel(item).toLowerCase()}
                </Checkbox.Label>
              </Checkbox.Root>
            );
          })}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}
