'use client';
import { CustomButton } from '@/components/common/CustomButton';
import CustomFormField from '@/components/common/CustomFormField';
import GlobalContainer from '@/components/GlobalContainer';
import Header from '@/components/header/Header';
import CategoriesHome from '@/components/home-page/CategoriesHome';
import FeaturedRecipes from '@/components/home-page/FeaturedRecipes';
import HeroSection from '@/components/home-page/HeroSection';
import { Container, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <GlobalContainer>
          <FeaturedRecipes />
          <CategoriesHome />
        </GlobalContainer>
      </main>
    </>
  );
}
