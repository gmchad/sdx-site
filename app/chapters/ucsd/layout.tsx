import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SDxUCSD',
    template: '%s · SDxUCSD',
  },
  description:
    "The home for UCSD's most ambitious builders and founders. SDx chapter at UC San Diego.",
};

export default function UCSDChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
