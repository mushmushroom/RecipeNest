import { Box, Separator } from '@chakra-ui/react';
import FilterGroup from './FilterGroup';
import { CategoryOption, DifficultyOption } from '@/lib/types/recipe';
import { CustomButton } from '../common/CustomButton';
import { useEffect, useState } from 'react';
import useFilters from '@/lib/hooks/useFilters';
import { CookingTimeOption, FiltersState } from '@/lib/types/filters';
import { usePathname, useSearchParams } from 'next/navigation';

const cookingTime = [
  { value: 'LESS_30', label: '< 30 min' },
  { value: 'BETWEEN_30_60', label: '30 min - 1 h' },
  { value: 'MORE_60', label: '> 1 h' },
];

interface FiltersPanelProps {
  options: {
    categories: CategoryOption[];
    difficulty: DifficultyOption[];
  };
}

export default function FiltersPanel({ options }: FiltersPanelProps) {
  const { filters, setFilters } = useFilters();
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  console.log('filters on page', filters);

  function handleCheckbox(key: keyof FiltersState, value: string) {
    setLocalFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((x) => x != value) : [...prev[key], value],
      };
    });
  }

  function handleApply() {
    setFilters(localFilters);
  }

  return (
    <Box minHeight="100vh">
      <FilterGroup<CategoryOption>
        title="Category"
        options={options.categories}
        getValue={(o) => o.name}
        getLabel={(o) => o.name}
        onToggle={(value) => handleCheckbox('category', value)}
        selected={localFilters.category}
      />
      <Separator borderColor="black" />
      <FilterGroup<DifficultyOption>
        title="Difficulty"
        options={options.difficulty}
        getValue={(o) => o}
        getLabel={(o) => o}
        onToggle={(value) => handleCheckbox('difficulty', value)}
        selected={localFilters.difficulty}
      />
      <Separator borderColor="black" />
      <FilterGroup<CookingTimeOption>
        title="Cooking time"
        options={cookingTime}
        getValue={(o) => o.value}
        getLabel={(o) => o.label}
        onToggle={(value) => handleCheckbox('cookingTime', value)}
        selected={localFilters.cookingTime}
      />
      <CustomButton variant="main" onClick={handleApply}>
        Apply
      </CustomButton>
    </Box>
  );
}
