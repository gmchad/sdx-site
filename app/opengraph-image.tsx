import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = "SDx — San Diego's builder-first technology community";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="Build here." subtitle="San Diego's builder-first technology community. 3000+ engineers, founders, and operators." bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
