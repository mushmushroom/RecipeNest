import GlobalContainer from '@/components/GlobalContainer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <GlobalContainer>{children}</GlobalContainer>
    </main>
  );
}
