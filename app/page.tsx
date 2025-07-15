'use client'

import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'
import LogoBar from "./logobar";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      <LogoBar />
      
      {/* Hero Section with dual paths */}
      <HeroSection />
      
      {/* Additional content sections can be added here */}
      
      {/* AI Talent Link - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background text-foreground py-4 text-center z-40 border-t border-border">
        <Link 
          href="https://airtable.com/appHsy3IiApTDvksA/shrOxmPTtfryRvHij" 
          target="_blank" 
          className="text-md hover:text-gray-300 transition-colors underline"
          onClick={() => sendGAEvent('clicked', {
            link_url: 'https://airtable.com/appHsy3IiApTDvksA/shrOxmPTtfryRvHij'
          })}
        >
          Work With Top AI Talent In Our Network
        </Link>
      </div>
    </main>
  );
}