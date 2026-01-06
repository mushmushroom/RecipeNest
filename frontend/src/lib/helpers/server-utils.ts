import { BACKEND_URL } from '@/lib/constants';
import {
  CategoryOption,
  DifficultyOption,
  FavoriteRecipesResponse,
  FeaturedRecipesResponse,
  RecipeShort,
} from '../types/recipe';
import { notFound } from 'next/navigation';

// revalidate
async function getItem<T>(item: string) {
  const res = await fetch(`${BACKEND_URL}/${item}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item}`);
  }

  return (await res.json()) as T;
}

export async function getOptions() {
  const [categories, difficulty] = await Promise.all([
    getItem<CategoryOption[]>('category'),
    getItem<DifficultyOption[]>('difficulty'),
  ]);
  return { categories, difficulty };
}

// unified function
export async function getRecipeItem<RecipeFull>(id: string, token?: string) {
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BACKEND_URL}/recipe/${id}`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json() as Promise<RecipeFull>;
}

// no cache, requires auth
export async function getRecipeItemAuth<T>(item: string, token: string, page = 1, pageSize = 10) {
  const res = await fetch(`${BACKEND_URL}/recipe/${item}?page=${page}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item}`);
  }

  return (await res.json()) as T;
}

// no cache, without auth
export async function getRecipeItemNoAuth<T>(item: string | number = '') {
  const res = await fetch(`${BACKEND_URL}/recipe/${item}`, {});
  if (res.status === 404) return notFound();
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item}`);
  }

  return (await res.json()) as T;
}

function buildQueryString(query: Record<string, any>) {
  const params: string[] = [];

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
      });
    } else if (value !== undefined && value !== null) {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return params.join('&');
}

// get recipes
export async function getRecipesPage<T>(query: Record<string, any>) {
  const queryString = buildQueryString(query);

  const res = await fetch(`${BACKEND_URL}/recipe?${queryString}`);
  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error(`Failed to fetch recipes`);

  return (await res.json()) as T;
}

// get featured
export async function getFeaturedRecipes(): Promise<FeaturedRecipesResponse> {
  const res = await fetch(`${BACKEND_URL}/recipe/featured`, { next: { revalidate: 3600 } });

  if (!res.ok) {
    return { data: [] };
  }

  return res.json();
}

// get favorites
export async function getUserFavorites(
  token: string,
  page = 1,
  pageSize = 10,
): Promise<FavoriteRecipesResponse> {
  if (!token) {
    throw new Error('Token is required');
  }

  const res = await fetch(`${BACKEND_URL}/user/me/favorites?pageSize=${pageSize}&page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch favorite recipes');
  }

  return res.json();
}

// add favorites
export async function addFavorite(recipeId: number, token: string) {
  return fetch(`${BACKEND_URL}/recipe/favorites/${recipeId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// delete favorites
export async function removeFavorite(recipeId: number, token: string) {
  return fetch(`${BACKEND_URL}/recipe/favorites/${recipeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// delete recipe
export async function deleteRecipe(recipeId: number, token: string) {
  return fetch(`${BACKEND_URL}/recipe/${recipeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
