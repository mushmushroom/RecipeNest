'use client';
import RecipeCard from '@/components/recipes/RecipeCard';
import { useMyRecipes } from '@/lib/hooks/recipes/useGetRecipes';

export default function MyRecipesPage() {
  const { data, isLoading, isError } = useMyRecipes();

  if (isLoading) return 'loading...';
  console.log(data);

  return (
    <div>
      <RecipeCard difficulty="HARD" />
    </div>
  );
}
