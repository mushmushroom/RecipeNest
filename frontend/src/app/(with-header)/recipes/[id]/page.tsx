import SingleRecipeContainer from '@/components/recipes/single-page/SingleRecipeContainer';
import { authOptions } from '@/lib/config/auth';
import { getRecipeItem } from '@/lib/helpers/server-utils';
import { RecipeFull } from '@/lib/types/recipe';
import { getServerSession } from 'next-auth';

export default async function SingleRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const recipe = await getRecipeItem<RecipeFull>(id, session?.backendTokens?.accessToken);
  return <SingleRecipeContainer recipe={recipe} session={session} mode="view" />;
}
