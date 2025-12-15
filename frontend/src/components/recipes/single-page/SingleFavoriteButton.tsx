'use client';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { CustomButton } from '@/components/common/CustomButton';
import useFavorites from '@/lib/hooks/useFavorites';

interface SingleFavoriteButtonProps {
  recipeId: number;
  token?: string;
}
export default function SingleFavoriteButton({ recipeId, token }: SingleFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites(token);

  return (
    <CustomButton variant="secondary" onClick={() => toggleFavorite(recipeId)} disabled={!token}>
      {isFavorite(recipeId) ? <FaBookmark /> : <FaRegBookmark />}
      {isFavorite(recipeId) ? "Remove from favorites " : "Add to favorites"}
    </CustomButton>
  );
}
