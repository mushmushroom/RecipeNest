import { useState } from 'react';
import { Drawer, Heading, Portal } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import { FaRegWindowClose } from 'react-icons/fa';
import { RecipePreview } from '@/lib/types/recipe';
import SingleRecipeContainer from '../recipes/single-page/SingleRecipeContainer';

interface PreviewDrawerProps {
  recipe: RecipePreview;
}

export default function PreviewDrawer({ recipe }: PreviewDrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  console.log(recipe);

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={(e) => setDrawerOpen(e.open)} placement="start">
      <Drawer.Trigger asChild>
        <CustomButton variant="outline">Preview</CustomButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            w="80vw"
            maxW="100vw"
            bg="white"
            position="absolute"
            minHeight="100vh"
            overflowY="auto"
          >
            <Drawer.CloseTrigger asChild marginRight="20px" marginTop="5px">
              <FaRegWindowClose size="20px" />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Drawer.Title asChild>
                <Heading as="h2" size="h2" color="brand.500">
                  Recipe Preview
                </Heading>
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body asChild>
              {' '}
              <SingleRecipeContainer recipe={recipe} mode="preview" />
            </Drawer.Body>
            <Drawer.Footer>
              <CustomButton variant="outline" onClick={() => setDrawerOpen(false)}>
                Close
              </CustomButton>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
