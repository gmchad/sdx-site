'use client'

import React from 'react';
import Programs from '../components/Programs';
import PastEvents from '../components/PastEvents';

export default function UCSDEventsPage() {
  return (
    <main className="relative min-h-[100svh] pt-20">
      <Programs />
      <PastEvents />
    </main>
  );
}
