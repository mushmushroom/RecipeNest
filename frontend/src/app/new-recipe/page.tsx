import RecipeForm from '@/components/new-recipe/RecipeForm';
import { getOptions } from '@/lib/helpers/server-utils';

export default async function AddRecipePage() {
  const options = await getOptions();
  return <RecipeForm options={options} />;
}
