import { GoogleAnalytics } from '@next/third-parties/google'
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
      <GoogleAnalytics gaId="G-M1FV7BZY8T"/>
      <body className={space.className}>{children}</body>
    </html>
  );
}
