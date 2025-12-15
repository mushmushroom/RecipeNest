import { PaginationData } from "./pagination";

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

export type UnitOption = 'g' | 'kg' | 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp' | 'pcs';

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
  images?: File[];
}

export type IngredientField = {
  name: string;
  amount: number;
  unit: string;
};

export type InstructionField = {
  description: string;
};

export interface AddRecipeFormValues {
  title: string;
  ingredients: IngredientField[];
  instructions: InstructionField[];
  difficulty: DifficultyOption;
  categoryId: number;
  cookingTime: CookingTime;
  images?: File[];
}

export interface RecipeShort {
  id: number;
  title: string;
  cookingTime: number;
  difficulty: DifficultyOption;
  images: ImageData[];
}

export interface IngredientData {
  id: number;
  name: string;
  amount: number;
  unit: UnitOption;
}

export interface InstructionData {
  id: number;
  step: number;
  description: string;
}

export interface ImageData {
  id: number;
  url: string;
}

export interface RecipeFull extends RecipeShort {
  ingredients: IngredientData[];
  instructions: InstructionData[];
  createdAt: string;
  author: { username: string };
  isFavorite?: boolean;
}


export interface MyRecipesResponse {
  data: RecipeShort[];
  meta: PaginationData;
}

export interface AllRecipesResponse {
  data: RecipeShort[];
  meta: PaginationData;
}
