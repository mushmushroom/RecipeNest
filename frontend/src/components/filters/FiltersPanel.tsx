import { Box, CheckboxGroup, Heading, Text, Checkbox, Stack, Separator } from '@chakra-ui/react';
import FilterGroup from './FilterGroup';

const categories = ['Desserts', 'Pasta', 'Breakfast'];
const difficulty = ['Easy', 'Medium', 'Hard'];
const cookingTime = ['< 30 min', '30 min - 1 h', '> 1 h'];

export default function FiltersPanel() {
  return (
    <Box minHeight="100vh">
      <FilterGroup title="Category" options={categories} />
      <Separator borderColor="black" />
      <FilterGroup title="Difficulty" options={difficulty} />
      <Separator borderColor="black" />
      <FilterGroup title="Cooking time" options={cookingTime} />
    </Box>
  );
}
