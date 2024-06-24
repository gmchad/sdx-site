'use client'

import Image from "next/image";
import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'
import LogoBar from "./logobar";

export default function Home() {
  return (
    <main className="">
       <div className="bg-[#0f0f0f] text-white min-h-screen flex flex-col items-center justify-center">
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
            Sign Up for 2024 Events
          </Link>

          <p className="text-lg">
            Check out the SDxAI 2023 Hackathon
            <span className="mx-1">
              <Link className="underline" target="_blank"  href="https://twitter.com/SDxCommunity/status/1683885108724658182" >
                video reel
              </Link>
            </span>
          </p>

          {/* <p className="text-lg">
          <span className="mx-1">
            <Link className="underline" target="_blank" href="https://airtable.com/applYd5Md0JPIJen4/shrwA56KnaWg17sV7">
              Sign Up
            </Link>
          </span>for 2024 events.</p> */}

           <nav className="flex justify-center space-x-6 text-lg">
            {/* <Link href="https://lu.ma/sdx" target="_blank" className="hover:text-gray-300 transition-colors underline">Events</Link> */}
            <Link 
              href="https://discord.gg/Rkgyzx2ykV" 
              target="_blank" 
              className="hover:text-gray-300 transition-colors underline"
              onClick={() => sendGAEvent({ event: 'clicked', value: 'https://discord.gg/Rkgyzx2ykV'})}
            >
              Discord
            </Link>
            <Link href="https://twitter.com/SDxCommunity" target="_blank" className="hover:text-gray-300 transition-colors underline">Twitter</Link>
          </nav>
          {/* <iframe
            src="https://lu.ma/embed/calendar/cal-V10NR2qI5uuUnOH/events?lt=dark?compact=true"
            className="w-full h-96 md:h-128 border-0 rounded-lg shadow-lg" // Style the iframe
            allowFullScreen
          ></iframe> */}
        </div>
      </div>
      <LogoBar/>
    </main>
  );
}
