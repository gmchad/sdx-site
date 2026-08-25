'use client'

import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MotionGrid from '@/app/components/motion/MotionGrid';
import MotionCard from '@/app/components/motion/MotionCard';
import SectionTag from '../components/SectionTag';
import styles from './gallery.module.css';

// ── Live build-log terminal ────────────────────────────────

const TERM_LINES = [
  '$ pnpm dev',
  '▲ triton-gpt v0.4.2 — ready in 312ms',
  '→ crawling 14,203 course catalog pages',
  '→ indexed 38 departments, 9 quarters',
  '✓ RAG pipeline online — 91% answer accuracy',
  '$ git push origin main',
  '✓ deployed → tritongpt.vercel.app',
];

function lineClass(line: string): string {
  if (line.startsWith('$')) return 'text-white/85';
  if (line.startsWith('✓')) return 'text-[#03C661]';
  if (line.startsWith('→')) return 'text-[#11BBCD]/90';
  return 'text-white/45';
}

function useTypewriter(lines: string[]) {
  const [rendered, setRendered] = useState<string[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRendered(lines);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (!cancelled) {
        setRendered([]);
        await sleep(500);
        for (let i = 0; i < lines.length; i++) {
          for (let c = 1; c <= lines[i].length; c++) {
            if (cancelled) return;
            const slice = lines[i].slice(0, c);
            setRendered((prev) => {
              const next = prev.slice(0, i);
              next[i] = slice;
              return next;
            });
            await sleep(12 + Math.random() * 20);
          }
          await sleep(240);
        }
        await sleep(3400);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lines]);

  return rendered;
}

function Terminal() {
  const rendered = useTypewriter(TERM_LINES);

  return (
    <div className="h-full rounded-lg border border-white/[0.08] bg-[#0A0A0A] overflow-hidden flex flex-col">
      {/* Window chrome — macOS dots in single prismatic colors */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D92C2D' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FAC205' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#03C661' }} />
        <span className="ml-3 text-[10px] uppercase tracking-widest text-white/30">
          tritongpt — build.log
        </span>
      </div>
      <div className="p-4 md:p-5 font-mono text-xs md:text-sm leading-[1.9] min-h-[240px] flex-1" aria-hidden="true">
        {rendered.map((line, i) => (
          <p key={i} className={`whitespace-pre-wrap ${lineClass(line)}`}>
            {line}
            {i === rendered.length - 1 && (
              <span className={`${styles.caret} text-white/70`}>▍</span>
            )}
          </p>
        ))}
        {rendered.length === 0 && <span className={`${styles.caret} text-white/70`}>▍</span>}
      </div>
    </div>
  );
}

// ── Project cards ──────────────────────────────────────────

const STATUS_DOT: Record<string, string> = {
  Shipped: '#03C661',
  Building: '#FC5715',
  Research: '#035593',
};

type Project = {
  name: string;
  desc: string;
  tags: string[];
  status: string;
  featured?: boolean;
  url?: string;
};

const projects: Project[] = [
  {
    name: 'TritonGPT',
    desc: 'RAG over the entire UCSD course catalog. Answers "what should I take?" with actual data.',
    tags: ['Next.js', 'pgvector', 'RAG'],
    status: 'Shipped',
    featured: true,
  },
  {
    name: 'SunGod',
    desc: 'Solar output forecasting for La Jolla microgrids, trained on Scripps weather data.',
    tags: ['PyTorch', 'Time series'],
    status: 'Research',
  },
  {
    name: 'Geisel OCR',
    desc: 'Digitizing 200k pages of campus archives with a vision pipeline built in a weekend.',
    tags: ['Vision', 'Whisper'],
    status: 'Building',
  },
  {
    name: 'RideBlue',
    desc: 'Carpool matching for UTC commuters. 400 students matched in the first month.',
    tags: ['React Native', 'Mapbox'],
    status: 'Shipped',
  },
  {
    name: 'KelpWatch',
    desc: 'ML on Scripps ocean sensor arrays to track kelp forest health along the coast.',
    tags: ['JAX', 'Sensors'],
    status: 'Building',
  },
];

function ProjectCard({ project }: { project: Project }) {
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const cardClassName = `${styles.spot} group h-full rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col transition-colors duration-300 hover:border-white/[0.15]`;

  const content = (
    <>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display text-xl text-white tracking-tight">{project.name}</h3>
        {project.url && (
          <ArrowUpRight className="w-4 h-4 text-white/30 transition-all duration-300 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </div>
      <p className="text-sm text-white/40 leading-relaxed flex-1">{project.desc}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-white/30 border border-white/10 rounded-sm px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/40 whitespace-nowrap">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: STATUS_DOT[project.status] }}
          />
          {project.status}
        </span>
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMouseMove}
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <div onMouseMove={onMouseMove} className={cardClassName}>
      {content}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionTag index="003" label="Built here" heading="Demoed on a Friday." className="mb-4" />

        <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
          {/* Featured: live build log */}
          <MotionCard enableHover={false} className="md:col-span-2">
            <Terminal />
          </MotionCard>

          {projects.slice(1).map((project) => (
            <MotionCard key={project.name}>
              <ProjectCard project={project} />
            </MotionCard>
          ))}
        </MotionGrid>

        <p className="mt-6 text-[10px] uppercase tracking-widest text-white/20">
          Sample of member work — swapped for the live project index at cohort launch.
        </p>
      </div>
    </section>
  );
}
