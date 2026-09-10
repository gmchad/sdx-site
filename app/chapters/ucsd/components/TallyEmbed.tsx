'use client'

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const EMBED_SCRIPT = 'https://tally.so/widgets/embed.js';

/**
 * Tally form embedded as an iframe. The Tally widget script sizes the frame to the form
 * and keeps the background transparent, so the form sits on the chapter's dark page.
 */
export default function TallyEmbed({ formId, title }: { formId: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const load = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      // Script missing or blocked: load the form without auto-height.
      const frame = frameRef.current;
      if (frame && !frame.src && frame.dataset.tallySrc) frame.src = frame.dataset.tallySrc;
    };

    if (window.Tally) {
      load();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', load);
    script.addEventListener('error', load);
    return () => {
      script?.removeEventListener('load', load);
      script?.removeEventListener('error', load);
    };
  }, [formId]);

  const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  return (
    <iframe
      ref={frameRef}
      data-tally-src={src}
      loading="lazy"
      width="100%"
      height="640"
      title={title}
      className="block w-full border-0"
    />
  );
}
