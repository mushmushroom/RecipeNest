'use client';

export type IngredientField = {
  name: string;
  amount: string;
  unit: string;
};

export type InstructionField = {
  description: string;
};

export type DifficultyOption = 'Easy' | 'Medium' | 'Hard';

export type TimeUnit = 'min' | 'hr';

export type CategoryOption = string;

export interface AddRecipeFormValues {
  ingredients: IngredientField[];
  instructions: InstructionField[];
  difficulty: DifficultyOption;
  category: CategoryOption;
  cookingTime: {
    amount: string;
    unit: TimeUnit;
  };
  images: File[];
}
