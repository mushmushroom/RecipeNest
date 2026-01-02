import { Tag } from '@chakra-ui/react';

interface FiltersBadgeProps {
  value: string;
  onRemove: () => void;
}

export default function FiltersBadge({ value, onRemove }: FiltersBadgeProps) {
  return (
    <Tag.Root
      key={`filters-${value}`}
      variant="subtle"
      borderColor="brand.400"
      backgroundColor="white"
      style={{ borderWidth: '1px', padding: '1rem', borderRadius: '8px' }}
    >
      <Tag.Label style={{ fontSize: '2rem', lineHeight: '2rem' }}>{value.toLowerCase()}</Tag.Label>
      <Tag.EndElement style={{ width: '15px', height: '15px' }}>
        <Tag.CloseTrigger
          style={{ cursor: 'pointer' }}
          onClick={onRemove}
        />
      </Tag.EndElement>
    </Tag.Root>
  );
}
