import React from 'react';
import Image from 'next/image';

interface Logo {
	src: string;
	alt: string;
}

const logos: Logo[] = [
	{ src: '/sponsors/cadre.png', alt: 'Cadre' },
	{ src: '/sponsors/anthropic.png', alt: 'Anthropic' },
	{ src: '/sponsors/elevenlabs.png', alt: 'ElevenLabs' },
	{ src: '/sponsors/hf.png', alt: 'Hugging Face' },
	{ src: '/sponsors/openai.png', alt: 'OpenAI' },
	{ src: '/sponsors/qualcomm.png', alt: 'Qualcomm' },
	{ src: '/sponsors/replit.png', alt: 'Replit' },
	{ src: '/sponsors/vercel.png', alt: 'Vercel' },
	{ src: '/sponsors/ucsd.png', alt: 'UCSD' },
];

const LogoBar: React.FC = () => {
	return (
		<section className="py-12 border-t border-white/5">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<p className="text-[10px] uppercase tracking-widest text-white/30 text-center mb-8">
					Partners
				</p>
				<div className="overflow-hidden">
					<div className="animate-marquee whitespace-nowrap inline-block">
						{[...logos, ...logos].map((logo, index) => (
							<div key={index} className="inline-block align-middle mx-8">
								<Image
									src={logo.src}
									alt={logo.alt}
									width={96}
									height={48}
									className="w-20 h-10 object-contain opacity-30 hover:opacity-60 transition-opacity duration-300"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LogoBar;
