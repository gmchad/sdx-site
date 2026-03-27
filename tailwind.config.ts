import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['var(--font-display)', 'sans-serif'],
  			mono: ['var(--font-mono)', 'monospace'],
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'holographic': 'linear-gradient(135deg, hsl(175, 70%, 40%), hsl(220, 75%, 55%), hsl(270, 65%, 60%), hsl(330, 75%, 55%), hsl(35, 85%, 55%))',
  		},
  		animation: {
  			marquee: 'marquee 20s linear infinite',
  			'holographic': 'holographic-shift 8s linear infinite',
  			'glow': 'glow-pulse 3s ease-in-out infinite',
  			'float': 'float 8s ease-in-out infinite',
  			'float-delayed': 'float 8s ease-in-out 2s infinite',
  			'float-slow': 'float 12s ease-in-out 1s infinite',
  			'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
			'blink': 'blink 1.2s cubic-bezier(1,0,0.31,1.39) infinite',
  		},
  		keyframes: {
  			marquee: {
  				'0%': { transform: 'translateX(0%)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			'holographic-shift': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'100%': { backgroundPosition: '200% 50%' },
  			},
  			'glow-pulse': {
  				'0%, 100%': { opacity: '0.4' },
  				'50%': { opacity: '0.8' },
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  			'fade-in-up': {
  				'0%': { opacity: '0', transform: 'translateY(16px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))',
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))',
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))',
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))',
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))',
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			sdx: {
  				teal: 'hsl(var(--sdx-teal))',
  				green: 'hsl(var(--sdx-green))',
  				amber: 'hsl(var(--sdx-amber))',
  				orange: 'hsl(var(--sdx-orange))',
  				magenta: 'hsl(var(--sdx-magenta))',
  				pink: 'hsl(var(--sdx-pink))',
  				blue: 'hsl(var(--sdx-blue))',
  				violet: 'hsl(var(--sdx-violet))',
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))',
  			},
  		},
  		boxShadow: {
  			'glow-teal': '0 0 20px hsla(175, 70%, 40%, 0.15)',
  			'glow-blue': '0 0 20px hsla(220, 75%, 55%, 0.15)',
  			'glow-magenta': '0 0 20px hsla(330, 75%, 55%, 0.15)',
  			'glow-violet': '0 0 20px hsla(270, 65%, 60%, 0.15)',
  			'glow-amber': '0 0 20px hsla(35, 85%, 55%, 0.15)',
  			'glow-white': '0 0 20px rgba(255, 255, 255, 0.03)',
  		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
