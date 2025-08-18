'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Mail, Building, Calendar, CheckCircle, Users, Star, ExternalLink, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';

// Executives data
const executives = require('../../data/executives.json');

interface ExecutiveCardProps {
  executive: typeof executives[0];
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ executive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate testimonial if it's longer than 150 characters
  const testimonialLimit = 150;
  const shouldTruncate = executive.testimonial && executive.testimonial.length > testimonialLimit;
  const displayedTestimonial = shouldTruncate && !isExpanded 
    ? executive.testimonial.substring(0, testimonialLimit) + '...'
    : executive.testimonial;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {executive.photoUrl ? (
            <Image
              src={executive.photoUrl}
              alt={executive.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : (
            <span className="text-2xl font-bold">
              {executive.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          )}
          <span className="text-2xl font-bold hidden">
            {executive.name.split(' ').map((n: string) => n[0]).join('')}
          </span>
        </div>
        <CardTitle className="text-xl">{executive.name}</CardTitle>
        {executive.title && <p className="text-muted-foreground">{executive.title}</p>}
        {executive.company && <Badge variant="secondary" className="w-fit mx-auto">{executive.company}</Badge>}
      </CardHeader>
      <CardContent className="space-y-4">
        {executive.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {executive.bio}
          </p>
        )}
        
        {executive.additionalRoles && executive.additionalRoles.length > 0 && (
          <div className="space-y-2">
            {executive.additionalRoles.map((role: string, index: number) => (
              <Badge key={index} variant="outline" className="w-full text-xs">
                {role}
              </Badge>
            ))}
          </div>
        )}
        
        {executive.testimonial && (
          <div className="bg-muted/30 p-4 rounded-lg">
            <blockquote className="text-sm italic text-muted-foreground text-center">
              &quot;{displayedTestimonial}&quot;
            </blockquote>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 h-6 text-xs"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-3 h-3 ml-1" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-3 h-3 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
        
        {executive.skills && executive.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {executive.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {executive.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{executive.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex gap-2 justify-center pt-2">
          {executive.linkedin && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={executive.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </Link>
            </Button>
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

  // Filter to only show featured executives
  const featuredExecutives = executives.filter((executive: typeof executives[0]) => executive.featured === true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/executives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          company,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Send Google Analytics event
        sendGAEvent('form_submit', {
          form_name: 'executives-application',
          email: email,
          company: company
        });
        
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
      <main className="relative bg-background text-foreground pt-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <CardTitle className="text-3xl">Application Submitted!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Thank you for your interest in the SDx Executive Network. We&apos;ll review your application and get back to you soon.
              </p>
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-background text-foreground pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600">
            <Crown className="w-6 h-6 mr-2" />
            Executive Network
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            San Diego&apos;s 
            <span className="text-blue-400"> AI Executive Community</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            An exclusive network of AI executives, Chief AI Officers, and senior leaders shaping the future of AI in San Diego
          </p>
        </div>

        {/* Apply to Join */}
        <Card className="max-w-2xl mx-auto mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <Mail className="w-6 h-6 inline mr-2" />
              Apply To Join
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Your Role *</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="e.g., Chief AI Officer, VP of AI, CTO"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Questions? Contact us directly at{' '}
                <Link 
                  href="mailto:contact@sdx.community" 
                  className="text-blue-400 hover:underline"
                  onClick={() => sendGAEvent('clicked', { link_url: 'mailto:contact@sdx.community', label: 'executives-contact' })}
                >
                  contact@sdx.community
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Roundtable Event */}
        <Card className="mb-16 border-2 border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-2">Next Executive Roundtable</CardTitle>
            <div className="text-center space-y-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Calendar className="w-5 h-5 mr-2" />
                September 30th, 12-2pm
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Building className="w-5 h-5 mr-2" />
                Cadre HQ
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">AI Implementation: Real-World Insights</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join us for an exclusive 2-hour executive roundtable focused on practical AI implementation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Key Use Cases</h4>
                    <p className="text-sm text-muted-foreground">Share and explore successful AI implementations across industries</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Biggest Inhibitors & Roadblocks</h4>
                    <p className="text-sm text-muted-foreground">Discuss common challenges and proven solutions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Open Experience Sharing</h4>
                    <p className="text-sm text-muted-foreground">Collaborative environment for honest discussions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">OpenAI Leadership in Attendance</h4>
                    <p className="text-sm text-muted-foreground">Share universal insights and industry perspectives</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-muted-foreground">
                Limited to 50 executive members • Apply above to secure your spot
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Featured Executives */}
        {featuredExecutives.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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