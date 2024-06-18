'use client'

import Image from "next/image";
import Link from "next/link"
import { sendGAEvent } from '@next/third-parties/google'

export default function Home() {
  return (
    <main className="">
       <div className="bg-[#0f0f0f] text-white min-h-screen flex flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            src="/sdx-logo-white.svg"
            alt="SDx Community Logo"
            width={250}
            height={250}
          />
        </div>
        <div className="max-w-lg text-center space-y-6">
          <p className="text-2xl">The next-gen startup community for builders in San Diego.</p>
          <p className="text-lg">
            Check out the SDxAI 2023 Hackathon
            <span className="mx-1">
              <Link className="underline" target="_blank"  href="https://twitter.com/SDxCommunity/status/1683885108724658182" >
                video reel
              </Link>
            </span>
          </p>
          <p className="text-lg">
          <span className="mx-1">
            <Link className="underline" target="_blank" href="https://airtable.com/applYd5Md0JPIJen4/shrwA56KnaWg17sV7">
              Sign Up
            </Link>
          </span>for 2024 events.</p>
          <div className="space-y-1">
            <Link className="block text-base underline" target="_blank" href="https://twitter.com/SDxCommunity">
              Twitter
            </Link>
            <Link className="block text-base underline" target="_blank" href="https://lu.ma/sdx">
              Events
            </Link>
            <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank" className="block text-base underline" onClick={() => sendGAEvent({ event: 'clicked', value: 'https://discord.gg/Rkgyzx2ykV'})}>
              Discord
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
