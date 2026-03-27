import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/tiposka/Tiposka-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'black',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Tiposka',
            fontSize: 24,
            color: 'white',
            marginTop: -2,
          }}
        >
          x
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Tiposka',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
