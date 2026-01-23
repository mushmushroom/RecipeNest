import type { Metadata } from 'next';
import { Nunito_Sans, Montagu_Slab } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const montaguSlab = Montagu_Slab({
  subsets: ['latin'],
  variable: '--font-montagu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RecipeNest - All your favorite recipes.',
  description: 'All your favorite recipes in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${nunitoSans.variable} ${montaguSlab.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
