
import RecipePageContainer from '@/components/filters/RecipePageContainer';
import { getOptions } from '@/lib/helpers/server-utils';

export default async function RecipesPage() {
  const options = await getOptions();

  return <RecipePageContainer options={options} />;
}
