import RecipeForm from "@/components/recipe-form/RecipeForm";
import { getOptions, getRecipeItem } from "@/lib/helpers/server-utils";
import { RecipeFull } from "@/lib/types/recipe";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const recipe: RecipeFull = await getRecipeItem(id);
  const options = await getOptions();

  return <RecipeForm mode="edit" options={options} initialRecipe={recipe} />;
}
