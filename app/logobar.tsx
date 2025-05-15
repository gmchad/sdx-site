// components/LogoBar.tsx
import React from 'react';
import Image from 'next/image';

interface Logo {
	src: string;
	alt: string;
}

const logos: Logo[] = [
	{ src: '/sponsors/anthropic.png', alt: 'anthropic' },
	{ src: '/sponsors/elevenlabs.png', alt: 'elevenlabs' },
	{ src: '/sponsors/hf.png', alt: 'hugging face' },
	{ src: '/sponsors/openai.png', alt: 'openai' },
	{ src: '/sponsors/qualcomm.png', alt: 'qualcomm' },
	{ src: '/sponsors/replit.png', alt: 'replit' },
	{ src: '/sponsors/groq.png', alt: 'groq' },
	{ src: '/sponsors/vercel.png', alt: 'vercel' },
	{ src: '/sponsors/ucsd.png', alt: 'ucsd' },

];

const LogoBar: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 w-full overflow-hidden py-6">
			<div className="flex align-middle justify-center">
				Sponsors
			</div>
			<div className="animate-marquee whitespace-nowrap inline-block">
				{[...logos, ...logos].map((logo, index) => (
				<div key={index} className="inline-block align-middle mx-6">
					<img 
						src={logo.src} 
						alt={logo.alt} 
						className="w-32 h-16 object-contain"
					/>
				</div>
				))}
			</div>
		</div>
	);
};

export default LogoBar;