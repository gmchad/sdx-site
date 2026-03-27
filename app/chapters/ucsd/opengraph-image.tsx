import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = 'SDxUCSD';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="SDxUCSD" subtitle="500+ members. Weekly demos. 5 companies spun out." badge="Chapter" bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
