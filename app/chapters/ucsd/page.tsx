'use client'

import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import StartBuilding from './components/StartBuilding';

export default function UCSDChapterPage() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <StartBuilding />
    </main>
  );
}
