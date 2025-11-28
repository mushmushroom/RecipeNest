'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  Collapsible,
  useBreakpointValue,
  Portal,
  Heading,
  Stack,
  Grid,
  useMediaQuery,
} from '@chakra-ui/react';

import FiltersPanel from '@/components/filters/FiltersPanel';
import { FaFilter, FaRegWindowClose } from 'react-icons/fa';
import GlobalContainer from '@/components/GlobalContainer';
import { CustomButton } from '@/components/common/CustomButton';
import RecipeCard from '@/components/recipes/RecipeCard';

export default function RecipesPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  // const [isLargerThanMd] = useMediaQuery(['(min-width: 768px)']);
  // const isMobile = !isLargerThanMd;

  // if (isMobile === undefined) return null;

  return (
    <Box as="main" paddingY="4rem">
      <GlobalContainer>
        <Heading size="h1" as="h1" textAlign="center" marginBottom="3.2rem">
          All recipes
        </Heading>
        {/* GRID LAYOUT */}
        <Grid
          gap="12rem"
          templateColumns={{
            base: '1fr',
            md: isCollapsed ? '1fr' : '190px 1fr',
          }}
        >
          {/* DESKTOP FILTERS */}
          {/* Desktop only */}
          <Box display={isCollapsed ? 'none' : 'block'} hideBelow="md">
            <Collapsible.Root open={!isCollapsed}>
              <Collapsible.Content>
                <FiltersPanel />
              </Collapsible.Content>
            </Collapsible.Root>
          </Box>

          {/* RECIPE LIST AND FILTERS BUTTON*/}
          <Stack gap="3rem">
            {/* Mobile only button*/}
            <Box hideFrom="md">
              <CustomButton
                onClick={() => setDrawerOpen(true)}
                variant="link"
                style={{
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  alignSelf: 'flex-end',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FaFilter />
                Show filters
              </CustomButton>
            </Box>

            {/* Desktop only button*/}
            <Box hideBelow="md">
              <CustomButton
                onClick={() => setCollapsed((prev) => !prev)}
                variant="link"
                style={{
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  alignSelf: 'flex-end',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <FaFilter />
                {isCollapsed ? 'Show filters' : 'Hide filters'}
              </CustomButton>
            </Box>
            <Box borderTop="1px solid black">
              <RecipeCard difficulty="HARD" />
            </Box>
          </Stack>
        </Grid>
      </GlobalContainer>

      {/* MOBILE DRAWER */}
      {/* Mobile only */}
      <Box asChild hideFrom="md">
        <Drawer.Root
          open={isDrawerOpen}
          onOpenChange={(e) => setDrawerOpen(e.open)}
          placement="start"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Content
              w="80vw"
              maxW="320px"
              bg="white"
              top="0"
              position="absolute"
              marginRight="40px"
            >
              <Drawer.CloseTrigger asChild marginRight="20px" marginTop="10px">
                <FaRegWindowClose size="20px" />
              </Drawer.CloseTrigger>
              <Drawer.Body paddingRight="40px">
                <FiltersPanel />
              </Drawer.Body>
            </Drawer.Content>
          </Portal>
        </Drawer.Root>
      </Box>
    </Box>
  );
}
