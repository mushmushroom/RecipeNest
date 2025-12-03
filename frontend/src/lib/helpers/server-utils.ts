import { BACKEND_URL } from '@/lib/constants';
import { CategoryOption, DifficultyOption } from '../types/recipe';
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

// no cache, requires auth
export async function getRecipeItemAuth<T>(item: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/recipe/${item}`, {
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
export async function getRecipeItemNoAuth<T>(item: string | number) {
  const res = await fetch(`${BACKEND_URL}/recipe/${item}`, {});
  if (res.status === 404) return notFound();
  if (!res.ok) {
    throw new Error(`Failed to fetch ${item}`);
  }

  return (await res.json()) as T;
}
