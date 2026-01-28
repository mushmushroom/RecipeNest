import { FiltersState } from '@/lib/types/filters';
import { HStack, Text } from '@chakra-ui/react';
import FiltersBadge from './FiltersBadge';

const cookingTimeLabelMap: Record<string, string> = {
  LESS_30: '< 30 min',
  BETWEEN_30_60: '30 min - 1 h',
  MORE_60: '> 1 h',
};

export default function AppliedFilters({
  filters,
  onRemove,
}: {
  filters: FiltersState;
  onRemove: (key: keyof FiltersState, value: string) => void;
}) {
  const hasFilters =
    filters.category.length ||
    filters.difficulty.length ||
    filters.cookingTime.length ||
    !!filters.search;

  if (!hasFilters) return <Text>No filters applied</Text>;

  return (
    <HStack wrap="wrap" gap="0.8rem" mb="1rem">
      {filters.search && (
        <FiltersBadge value={filters.search} onRemove={() => onRemove('search', filters.search)} />
      )}

      {filters.category.map((value) => (
        <FiltersBadge
          key={`filters-${value}`}
          value={value}
          onRemove={() => onRemove('category', value)}
        />
      ))}

      {filters.difficulty.map((value) => (
        <FiltersBadge
          key={`filters-${value}`}
          value={value}
          onRemove={() => onRemove('difficulty', value)}
        />
      ))}

      {filters.cookingTime.map((value) => (
        <FiltersBadge
          key={`filters-${value}`}
          value={cookingTimeLabelMap[value]}
          onRemove={() => onRemove('cookingTime', value)}
        />
      ))}
    </HStack>
  );
}
