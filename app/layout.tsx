import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import { inter, space } from '@/app/ui/fonts';
import Navigation from '@/app/components/Navigation';
import LogoBar from '@/app/logobar';
import Footer from '@/app/components/Footer';
import "./globals.css";


export const metadata: Metadata = {
  title: "SDx - The next-gen startup community for AI builders",
  description: "Join 1000+ AI builders in San Diego creating the future through events, mentorship, and collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics gaId="G-M1FV7BZY8T"/>
      <body className={`${space.className} dark bg-background text-foreground`}>
        <Navigation />
        <LogoBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
