import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = 'SDxUCSD';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="SDxUCSD" subtitle="1,200+ attendees hosted. 30+ events. 6+ hackathons." badge="Chapter" bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
