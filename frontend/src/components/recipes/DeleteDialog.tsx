import { Dialog, Text } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import { FiTrash2 } from 'react-icons/fi';
import useDeleteRecipe from '@/lib/hooks/recipes/useDeleteRecipe';

interface DeleteDialogProps {
  recipeTitle: string;
  recipeId: number;
}
export default function DeleteDialog({ recipeId, recipeTitle }: DeleteDialogProps) {
  const { deleteRecipe } = useDeleteRecipe();

  return (
    <Dialog.Root placement="center" role="alertdialog">
      <Dialog.Trigger asChild>
        <CustomButton
          aria-label={`Delete recipe ${recipeTitle}`}
          variant="danger"
          style={{ padding: '1rem' }}
        >
          <FiTrash2 color="black" />
        </CustomButton>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content padding="2rem">
          <Dialog.Header>
            <Dialog.Title fontSize="2.2rem" lineHeight="1.4">
              Delete recipe{' '}
              <Text as="span" color="brand.500">
                {recipeTitle}
              </Text>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body fontSize="1.8rem" lineHeight="1.4">
            <p>
              Are you sure you want to delete the recipe "{recipeTitle}"? This action cannot be
              undone.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <CustomButton variant="outline">Cancel</CustomButton>
            </Dialog.ActionTrigger>
            <CustomButton onClick={() => deleteRecipe(recipeId)} variant="danger">
              Delete
            </CustomButton>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
