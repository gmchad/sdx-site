import type { Metadata } from 'next';
import TallyEmbed from '../components/TallyEmbed';
import { UCSD_EMAIL, UCSD_TALLY_FORM_ID } from '../lib/links';

export const metadata: Metadata = {
  title: 'Apply',
  description: 'Apply to join SDxUCSD, the SDx chapter at UC San Diego.',
};

export default function UCSDApplyPage() {
  return (
    <main className="relative min-h-[100svh] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-white tracking-tight prismatic-glow">
          Apply to SDxUCSD
        </h1>
        <p className="mt-4 text-base text-white/50 leading-relaxed">
          Tell us who you are and what you want to build.
        </p>

        <div className="mt-10">
          {UCSD_TALLY_FORM_ID ? (
            <TallyEmbed formId={UCSD_TALLY_FORM_ID} title="SDxUCSD member application" />
          ) : (
            <p className="text-sm text-white/50 leading-relaxed">
              Applications open soon. Until then, email{' '}
              <a
                href={`mailto:${UCSD_EMAIL}`}
                className="text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white transition-colors"
              >
                {UCSD_EMAIL}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
