'use client';

import {  CookingTime, DifficultyOption } from "./recipe";

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
  // TO ADD
  // images: File[];
}
