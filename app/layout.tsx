import type { Metadata } from "next";
import { inter, space } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "SDx",
  description: "The next-gen startup ecosystem for builders in San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space.className}>{children}</body>
    </html>
  );
}
