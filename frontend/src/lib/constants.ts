export const BACKEND_URL = 'http://localhost:8000';

export enum AppPathPublic {
  Login = '/login',
  Register = '/register',
  Verify = '/verify',
  Recipes = '/recipes',
}

export enum AppPathProtected {
  MyRecipes = '/my-recipes',
  AddRecipe = '/my-recipes/new',
  EditRecipe = '/my-recipes/edit',
  Favorites = '/favorites',
  Settings = '/settings',
}
