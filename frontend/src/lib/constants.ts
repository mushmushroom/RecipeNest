export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export enum AppPathPublic {
  Home = '/',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgot-password',
  Verify = '/verify',
  Recipes = '/recipes',
}

export enum AppPathProtected {
  AddRecipe = '/new-recipe',
  MyRecipes = '/my-recipes',
  EditRecipe = '/edit',
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

export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const PASSWORDREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

