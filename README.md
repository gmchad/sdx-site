# SDx — San Diego's Builder-First Technology Community

The official website for SDx, a community of 3000+ engineers, founders, and operators building at the cutting edge in San Diego.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Motion.dev (framer-motion) + CSS keyframes
- **Visual Effects:** Canvas 2D metaball blobs, ASCII fire, ColorBends WebGL shader
- **Fonts:** Tiposka (display), Space Mono (mono)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  components/       # Shared components (Hero, Footer, Navigation, etc.)
  components/motion/ # Motion.dev animation wrappers
  events/           # Events page (Lu.ma integration)
  members/          # Community members
  chapters/         # University chapters (UCSD, SDSU)
  startups/         # SDx member startups
  executives/       # Executive network
components/         # shadcn/ui components + ColorBends shader
data/               # JSON data (members, startups, executives, events)
lib/                # Motion config, API clients, utilities
```
