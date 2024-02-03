import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="">
       <div className="bg-[#0f0f0f] text-white min-h-screen flex flex-col items-center justify-center">
        <div className="text-8xl font-black tracking-wider mb-12">SDx</div>
        <div className="max-w-lg text-center space-y-6">
          <p className="text-xl">The next-gen startup community for builders in San Diego.</p>
          <p className="text-base">
            Check out the SDxAI 2023 Hackathon
            <span className="mx-1">
              <Link className="underline" href="#">
                video reel
              </Link>
            </span>
          </p>
          <p className="text-base">
          <span className="mx-1">
            <Link className="underline" href="#">
              Sign Up
            </Link>
          </span>for 2024 events.</p>
          <div className="space-y-2">
            <Link className="block text-base underline" href="#">
              Twitter
            </Link>
            <Link className="block text-base underline" href="#">
              Events
            </Link>
            <Link className="block text-base underline" href="#">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
