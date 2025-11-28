export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export enum AppPathPublic {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Verify = '/verify',
  Recipes = '/recipes',
}

export enum AppPathProtected {
  AddRecipe = '/new-recipe',
  MyRecipes = '/my-recipes',
  EditRecipe = '/my-recipes/edit',
  Favorites = '/favorites',
  Settings = '/settings',
}

export const categoriesHome = [
  {
    text: 'Salads',
    img: '/categories/salads.jpg',
  },
  {
    text: 'Pasta',
    img: '/categories/pasta.jpg',
  },
  {
    text: 'Desserts',
    img: '/categories/desserts.jpg',
  },
];
