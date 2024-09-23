'use client'

import Image from "next/image";
import Link from "next/link"
import LogoBar from "../../logobar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white">
      <LogoBar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-8">
          <Image
            src="/sdx-v2.png"
            alt="SDx Community Logo"
            width={300}
            height={250}
          />
        </div>
        <div className="max-w-2xl space-y-6">
          <h1 className="text-3xl font-bold mb-4 text-center">SDx @ UC San Diego </h1>
          <p className="text-lg mb-6 text-left">
            SDx @ UC San Diego is an invite-only meetup where the best UCSD students building with AI get to share their latest experiments and projects with peers.
            We curate small groups for each event to make sure it's a safe and fun place to demo and to keep the quality high.
          </p>
          <div className="text-center">
            <Link 
              href="mailto:ucsd@sdx.community" 
              className="inline-block bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors text-lg font-semibold"
            >
              Contact the Chapter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}