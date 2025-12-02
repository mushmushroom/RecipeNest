import { RecipeShort } from '@/lib/types/recipe';
import { Grid } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: RecipeShort[];
  columns: string | { [key: string]: string };
}
export default function RecipeList({ recipes, columns }: RecipeListProps) {
  return (
    <Grid templateColumns={columns} width="100%" justifyContent="space-between" gap="2rem">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
}
