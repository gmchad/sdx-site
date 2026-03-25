'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '@/app/components/SectionHeader';

const executives = require('../../data/executives.json');

interface ExecutiveCardProps {
  executive: typeof executives[0];
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ executive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const testimonialLimit = 150;
  const shouldTruncate = executive.testimonial && executive.testimonial.length > testimonialLimit;
  const displayedTestimonial = shouldTruncate && !isExpanded
    ? executive.testimonial.substring(0, testimonialLimit) + '...'
    : executive.testimonial;

  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/[0.04] flex items-center justify-center overflow-hidden">
          {executive.photoUrl ? (
            <Image
              src={executive.photoUrl}
              alt={executive.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : (
            <span className="text-lg font-display text-white/40">
              {executive.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          )}
          <span className="text-lg font-display text-white/40 hidden">
            {executive.name.split(' ').map((n: string) => n[0]).join('')}
          </span>
        </div>
        <CardTitle className="text-base">{executive.name}</CardTitle>
        {executive.title && <p className="text-sm text-white/40">{executive.title}</p>}
        {executive.company && <Badge variant="secondary" className="w-fit mx-auto mt-1">{executive.company}</Badge>}
      </CardHeader>
      <CardContent className="space-y-3">
        {executive.bio && (
          <div className="space-y-1.5">
            {Array.isArray(executive.bio) ? (
              executive.bio.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-sdx-amber mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-white/40 leading-relaxed">{point}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/40 leading-relaxed">{executive.bio}</p>
            )}
          </div>
        )}

        {executive.additionalRoles && executive.additionalRoles.length > 0 && (
          <div className="space-y-1">
            {executive.additionalRoles.map((role: string, index: number) => (
              <Badge key={index} variant="outline" className="w-full justify-start">{role}</Badge>
            ))}
          </div>
        )}

        {executive.testimonial && (
          <div className="bg-white/[0.02] p-3 rounded-lg">
            <blockquote className="text-xs italic text-white/30 text-center leading-relaxed">
              &quot;{displayedTestimonial}&quot;
            </blockquote>
            {shouldTruncate && (
              <button
                className="w-full mt-2 text-xs uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors duration-200 flex items-center justify-center gap-1"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <>Less <ChevronUp className="w-3 h-3" /></> : <>More <ChevronDown className="w-3 h-3" /></>}
              </button>
            )}
          </div>
        )}

        <div className="flex gap-1 justify-center pt-1">
          {executive.linkedin && (
            <Link href={executive.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/20 hover:text-white transition-colors duration-200">
              <Linkedin className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function ExecutivesPage() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const featuredExecutives = executives.filter((executive: typeof executives[0]) => executive.featured === true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/executives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, role }),
      });
      const data = await response.json();
      if (response.ok) {
        sendGAEvent('form_submit', { form_name: 'executives-application', email, company });
        setIsSubmitted(true);
      } else {
        setSubmitError(data.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-24 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-6 text-sdx-teal" />
          <h1 className="font-display text-3xl text-white mb-4">Application submitted.</h1>
          <p className="text-sm text-white/40 mb-8">
            We&apos;ll review your application and get back to you soon.
          </p>
          <Link href="/" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200">
            Return home &rarr;
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <SectionHeader
          title="Executive Network"
          subtitle="Peer-level AI implementation exchange for C-suite leaders. Real experience, shared openly. Not a conference. Not a vendor pitch."
          badge="Leadership"
        />

        {/* Hero: Event + Form */}
        <div className="grid lg:grid-cols-5 gap-6 mb-16">
          {/* Event Details */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-8">
                <span className="text-xs uppercase tracking-widest text-white/30">Next roundtable</span>
                <h2 className="font-display text-2xl text-white mt-2 mb-6">AI Implementation: Real-World Insights</h2>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline">September 30th, 12-2pm</Badge>
                  <Badge variant="outline">Cadre HQ</Badge>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-8">
                  Exclusive 2-hour executive roundtable on practical AI implementation. Share use cases, discuss inhibitors, and exchange solutions with peers navigating the same challenges.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Key Use Cases', desc: 'Share successful AI implementations' },
                    { title: 'Inhibitors & Solutions', desc: 'Challenges and proven solutions' },
                    { title: 'Open Exchange', desc: 'Collaborative, off-the-record' },
                    { title: 'Industry Perspectives', desc: 'OpenAI and partner insights' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-sdx-amber mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-white/60 font-bold">{item.title}</div>
                        <div className="text-xs text-white/30">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 mt-8 pt-4">
                  <p className="text-xs uppercase tracking-widest text-white/20">Limited to 50 executive members</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="h-full holographic-border">
              <CardContent className="p-6">
                <h3 className="font-display text-xl text-white mb-1">Apply</h3>
                <p className="text-xs text-white/30 mb-6">
                  Join San Diego&apos;s AI executive network.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 bg-white/[0.02] border border-destructive/30 rounded text-xs text-destructive">
                      {submitError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest text-white/40">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-9 bg-white/[0.02] border-white/10 text-sm placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-xs uppercase tracking-widest text-white/40">Company *</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-9 bg-white/[0.02] border-white/10 text-sm placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-xs uppercase tracking-widest text-white/40">Role *</Label>
                    <Input
                      id="role"
                      type="text"
                      placeholder="Chief AI Officer, VP of AI, CTO"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-9 bg-white/[0.02] border-white/10 text-sm placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-2.5 text-xs uppercase tracking-widest rounded-sm hover:bg-white/90 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Apply'}
                  </button>
                </form>

                <p className="text-xs text-white/20 mt-4 text-center">
                  Questions?{' '}
                  <Link href="mailto:contact@sdx.community" className="text-white/40 hover:text-white transition-colors duration-200">
                    contact@sdx.community
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Executives */}
        {featuredExecutives.length > 0 && (
          <div className="mb-16">
            <h2 className="font-display text-2xl text-white mb-6">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredExecutives.map((executive: typeof executives[0]) => (
                <ExecutiveCard key={executive.id} executive={executive} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
