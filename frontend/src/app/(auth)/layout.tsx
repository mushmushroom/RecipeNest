import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RecipeNest | Access your account',
  description: 'Access your account',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
