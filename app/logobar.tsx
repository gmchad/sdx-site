// components/LogoBar.tsx
import React from 'react';
import Image from 'next/image';

interface Logo {
	src: string;
	alt: string;
}

const logos: Logo[] = [
	{ src: '/sponsors/cadre.png', alt: 'cadre' },
	{ src: '/sponsors/anthropic.png', alt: 'anthropic' },
	{ src: '/sponsors/elevenlabs.png', alt: 'elevenlabs' },
	{ src: '/sponsors/hf.png', alt: 'hf' },
	{ src: '/sponsors/openai.png', alt: 'openai' },
	{ src: '/sponsors/qualcomm.png', alt: 'qualcomm' },
	{ src: '/sponsors/replit.png', alt: 'replit' },
	{ src: '/sponsors/vercel.png', alt: 'vercel' },
	{ src: '/sponsors/ucsd.png', alt: 'ucsd' }
];

const LogoBar: React.FC = () => {
	return (
		<div className="fixed top-16 left-0 w-full overflow-hidden py-4 bg-background/80 backdrop-blur-sm z-30 border-b border-border">
			<div className="flex align-middle justify-center text-muted-foreground text-sm mb-2">
				Sponsors
			</div>
			<div className="animate-marquee whitespace-nowrap inline-block">
				{[...logos, ...logos].map((logo, index) => (
				<div key={index} className="inline-block align-middle mx-6">
					<Image 
						src={logo.src} 
						alt={logo.alt} 
						width={96}
						height={48}
						className="w-24 h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
					/>
				</div>
				))}
			</div>
		</div>
	);
};

export default LogoBar;