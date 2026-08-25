import data from '../data/event-media.json'
import builderDays from '../assets/events/builder-days.jpg'
import hackathon from '../assets/events/hackathon.jpg'
import flagship from '../assets/events/flagship.jpg'
import fireside from '../assets/events/fireside.jpg'

const localCovers: Record<string, string> = {
  'builder-days': builderDays.src,
  hackathons: hackathon.src,
  'flagship-events': flagship.src,
  'fireside-chats': fireside.src,
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
