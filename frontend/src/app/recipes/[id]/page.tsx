import SingleRecipeContainer from '@/components/recipes/single-page/SingleRecipeContainer';
import { getRecipeItemNoAuth } from '@/lib/helpers/server-utils';
import { RecipeFull } from '@/lib/types/recipe';

export default async function SingleRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await getRecipeItemNoAuth<RecipeFull>(id);
  return <SingleRecipeContainer recipe={ recipe} />;
}
