import { Dialog, Text } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import { FiTrash2 } from 'react-icons/fi';
import useDeleteRecipe from '@/lib/hooks/recipes/useDeleteRecipe';
import useDeleteAccount from '@/lib/hooks/settings/useDeleteAccount';

export default function DeleteAccountDialog() {
  const { deleteAccount } = useDeleteAccount();

  return (
    <Dialog.Root placement="center" role="alertdialog">
      <Dialog.Trigger asChild>
        <CustomButton aria-label="Delete account" variant="danger" style={{ padding: '1rem' }}>
          Delete my account
        </CustomButton>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content padding="2rem">
          <Dialog.Header>
            <Dialog.Title fontSize="2.2rem" lineHeight="1.4">
              Delete account 
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body fontSize="1.8rem" lineHeight="1.4">
            Are you sure you want to delete the account? This action cannot be undone.
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <CustomButton variant="outline">Cancel</CustomButton>
            </Dialog.ActionTrigger>
            <CustomButton variant="danger" onClick={deleteAccount}>
              Delete my account
            </CustomButton>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
