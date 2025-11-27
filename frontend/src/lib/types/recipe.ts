interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Instruction {
  description: string;
}

export type TimeUnit = 'min' | 'hr';

export interface CookingTime {
  amount: number;
  unit: TimeUnit;
}

export type DifficultyOption = 'EASY' | 'MEDIUM' | 'HARD';

export type CategoryOption = {
  id: number;
  name: string;
};

export interface RecipePayload {
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  difficulty: DifficultyOption;
  categoryId: number;
  cookingTime: number;
  // TO ADD
  // images: string[];
}
