import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = 'SDx Events';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="Events" subtitle="Paper Club, AI Coffee, Hack Days, Hackathons, and more." badge="Community" bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
