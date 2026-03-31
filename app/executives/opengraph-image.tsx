import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = 'SDx Executive Network';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="Executive Network" subtitle="Peer-level AI implementation exchange for C-suite leaders." badge="Leadership" bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
