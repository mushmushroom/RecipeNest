'use client';

import { FaBookmark } from 'react-icons/fa';
import { CustomButton } from '@/components/common/CustomButton';
import useFavorites from '@/lib/hooks/useFavorites';
import { useFetchAuth } from '@/lib/hooks/useFetchAuth';

interface CardFavoriteButtonProps {
  recipeId: number;
}
export default function CardFavoriteButton({ recipeId }: CardFavoriteButtonProps) {
  const { token } = useFetchAuth(true);
  const { toggleFavorite } = useFavorites(token);

  return (
    <CustomButton
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      disabled={!token}
      aria-label="Remove from favorites"
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem',
      }}
    >
      <FaBookmark />
    </CustomButton>
  );
}
