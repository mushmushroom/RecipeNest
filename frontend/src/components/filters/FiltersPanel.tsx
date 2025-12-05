import { Box, Separator } from '@chakra-ui/react';
import FilterGroup from './FilterGroup';
import { CategoryOption, DifficultyOption } from '@/lib/types/recipe';

const cookingTime = ['< 30 min', '30 min - 1 h', '> 1 h'];

interface FiltersPanelProps {
  options: {
    categories: CategoryOption[];
    difficulty: DifficultyOption[];
  };
}

export default function FiltersPanel({ options }: FiltersPanelProps) {
  return (
    <Box minHeight="100vh">
      <FilterGroup<CategoryOption>
        title="Category"
        options={options.categories}
        getValue={(o) => String(o.id)}
        getLabel={(o) => o.name}
      />
      <Separator borderColor="black" />
      <FilterGroup<DifficultyOption>
        title="Difficulty"
        options={options.difficulty}
        getValue={(o) => o}
        getLabel={(o) => o}
      />
      <Separator borderColor="black" />
      <FilterGroup<string>
        title="Cooking time"
        options={cookingTime}
        getValue={(o) => o}
        getLabel={(o) => o}
      />
    </Box>
  );
}
