import type { StaticImageData } from 'next/image'
import data from '../data/event-media.json'
import builderDays from '../assets/events/builder-days.jpg'
import hackathon from '../assets/events/hackathon.jpg'
import flagship from '../assets/events/flagship.jpg'
import fireside from '../assets/events/fireside.jpg'

// Keep the full StaticImageData object (not just `.src`) so consumers can
// render these through next/image and get width/height + optimization for
// free, instead of falling back to a raw <img> of the full-res original.
const localCovers: Record<string, StaticImageData> = {
  'builder-days': builderDays,
  hackathons: hackathon,
  'flagship-events': flagship,
  'fireside-chats': fireside,
}

export const media = {
  about: data.about.map((tile) => ({
    ...tile,
    cover: localCovers[tile.id] ?? tile.cover,
  })),
  past: data.past,
  stats: data.stats,
}

export default media
