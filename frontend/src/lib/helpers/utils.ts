import { RecipeFormValues, RecipeFull } from "../types/recipe";

export function formatMinutesToHours(min: number) {
  return min / 60 > 1 ? `${Math.round(min / 60 * 100) / 100} h` : `${min} min`;
}


export function mapRecipeToFormValues(recipe: RecipeFull): RecipeFormValues {
  return {
    title: recipe.title,
    categoryId: recipe.categoryId,
    difficulty: recipe.difficulty,
    cookingTime: {
      amount: recipe.cookingTime >= 60 ? Math.round((recipe.cookingTime / 60) * 100) / 100 : recipe.cookingTime,
      unit: recipe.cookingTime >= 60 ? 'hr' : 'min',
    },

    ingredients: recipe.ingredients.map((i) => ({
      name: i.name,
      amount: i.amount,
      unit: i.unit,
    })),

    instructions: recipe.instructions
      .sort((a, b) => a.step - b.step)
      .map((i) => ({
        description: i.description,
      })),

    images: [],
  };
}