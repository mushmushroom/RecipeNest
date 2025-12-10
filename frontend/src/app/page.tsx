import GlobalContainer from '@/components/GlobalContainer';
import Header from '@/components/header/Header';
import CategoriesHome from '@/components/home-page/CategoriesHome';
import FeaturedRecipes from '@/components/home-page/FeaturedRecipes';
import HeroSection from '@/components/home-page/HeroSection';
import { authOptions } from '@/lib/config/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header session={ session} />
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
