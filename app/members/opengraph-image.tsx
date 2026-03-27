import { ImageResponse } from 'next/og';
import { loadFonts, loadBgImage, OGImage } from '@/lib/og-utils';

export const alt = 'SDx Featured Members';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [fonts, bgSrc] = await Promise.all([loadFonts(), loadBgImage()]);
  return new ImageResponse(
    <OGImage title="Featured Members" subtitle="Engineers, founders, and operators building at the cutting edge in San Diego." badge="Community" bgSrc={bgSrc} />,
    { ...size, fonts }
  );
}
