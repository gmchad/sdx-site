'use client'

import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">      
      {/* Builder-focused Hero Section */}
      <div className="pt-48">
        <HeroSection />
      </div>
    </main>
  );
}