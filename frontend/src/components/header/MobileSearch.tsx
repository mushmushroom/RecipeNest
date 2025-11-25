'use client';

import { IconButton, Dialog, Portal, Box } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import SearchInput from './SearchInput';

export default function MobileSearch() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Search" variant="ghost" >
          <FaSearch style={{ width: '18px', height: '18px' }} />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="brand.500" padding="2rem" maxWidth="100%" margin="0" borderRadius="0">
            <SearchInput />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
