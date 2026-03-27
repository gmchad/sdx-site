import { readFile } from 'fs/promises';
import { join } from 'path';

export async function loadFonts() {
  const tiposka = await readFile(
    join(process.cwd(), 'public/fonts/tiposka/Tiposka-Regular.ttf')
  );

  return [
    { name: 'Tiposka', data: tiposka, style: 'normal' as const, weight: 400 as const },
  ];
}

export async function loadBgImage() {
  const bgBuffer = await readFile(join(process.cwd(), 'public/og-bg.png'));
  return `data:image/png;base64,${bgBuffer.toString('base64')}`;
}

export function OGImage({
  title,
  subtitle,
  badge,
  bgSrc,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  bgSrc: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '60px 80px',
        position: 'relative',
      }}
    >
      {/* ASCII fire background */}
      <img
        src={bgSrc}
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Logo — top left */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 80,
          fontFamily: 'Tiposka',
          fontSize: 96,
          color: 'white',
          display: 'flex',
        }}
      >
        SDx
      </div>

      {/* Dark backdrop behind text */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.95) 100%)',
          display: 'flex',
        }}
      />

      {/* Content — bottom left */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {badge && (
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 12,
              display: 'flex',
            }}
          >
            {badge}
          </div>
        )}

        <div
          style={{
            fontFamily: 'Tiposka',
            fontSize: 96,
            color: 'white',
            lineHeight: 1.05,
            display: 'flex',
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize: 30,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 20,
              maxWidth: '75%',
              lineHeight: 1.3,
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Bottom right URL */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 80,
          fontSize: 20,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          display: 'flex',
        }}
      >
        sdx.community
      </div>
    </div>
  );
}
