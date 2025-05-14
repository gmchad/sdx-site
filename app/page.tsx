'use client'

import Image from "next/image";
import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'
import LogoBar from "./logobar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white">
      <LogoBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
        <div className="mb-12">
          <Image
            src="/sdx-v2.png"
            alt="SDx Community Logo"
            width={300}
            height={250}
          />
        </div>
        <div className="max-w-lg text-center space-y-6">
          <p className="text-2xl">The next-gen startup community for AI builders in San Diego.</p>

          <Link 
            href="https://lu.ma/sdx" 
            className="inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            target="_blank"
          >
            Sign Up for 2025 Events
          </Link>

          <p className="text-lg">
            Check out the SDxAI 2023 Hackathon
            <span className="mx-1">
              <Link className="underline" target="_blank"  href="https://twitter.com/SDxCommunity/status/1683885108724658182" >
                video reel
              </Link>
            </span>
          </p>

           <nav className="flex justify-center space-x-6 text-lg">
            <Link 
              href="https://discord.gg/Rkgyzx2ykV" 
              target="_blank" 
              className="hover:text-gray-300 transition-colors underline"
              onClick={() => sendGAEvent('clicked', {
                link_url: 'https://discord.gg/Rkgyzx2ykV'
              })}
            >
              Discord
            </Link>
            <Link href="https://twitter.com/SDxCommunity" target="_blank" className="hover:text-gray-300 transition-colors underline">Twitter</Link>
          </nav>
        </div>
      </div>
      
      {/* AI Talent Link - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] text-white py-4 text-center">
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