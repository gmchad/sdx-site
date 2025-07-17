'use client'

import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'
import LogoBar from "./logobar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <LogoBar />
      
      {/* Builder-focused Hero Section */}
      <div className="pt-32">
        <HeroSection />
      </div>
      
      {/* Additional content sections can be added here */}
      
      {/* Community Join Link - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background text-foreground py-4 text-center z-40 border-t border-border">
        <Link 
          href="https://lu.ma/sdx" 
          target="_blank" 
          className="text-md hover:text-gray-300 transition-colors underline"
          onClick={() => sendGAEvent('clicked', {
            link_url: 'https://lu.ma/sdx'
          })}
        >
          Join San Diego&apos;s Premier AI Builder Community
        </Link>
      </div>
    </main>
  );
}