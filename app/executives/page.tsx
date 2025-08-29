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
          <div className="space-y-2">
            {Array.isArray(executive.bio) ? (
              executive.bio.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {executive.bio}
              </p>
            )}
          </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600">
            <Crown className="w-5 h-5 mr-2" />
            Executive Network
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            San Diego&apos;s 
            <span className="text-blue-400"> AI Executive Community</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join AI executives, Chief AI Officers, and senior leaders shaping the future
          </p>
        </div>

         {/* Hero Section: Event + Form Side by Side */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Event Details - Left Side */}
          <div className="lg:col-span-3">
            <Card className="h-full border-2 border-blue-400/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl lg:text-3xl mb-4">Next Executive Roundtable</CardTitle>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                  <Badge variant="outline" className="text-base px-3 py-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    September 30th, 12-2pm
                  </Badge>
                  <Badge variant="outline" className="text-base px-3 py-1">
                    <Building className="w-4 h-4 mr-2" />
                    Cadre HQ
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">AI Implementation: Real-World Insights</h3>
                  <p className="text-base text-muted-foreground">
                    Exclusive 2-hour executive roundtable on practical AI implementation
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Key Use Cases</h4>
                      <p className="text-xs text-muted-foreground">Share successful AI implementations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Inhibitors & Solutions</h4>
                      <p className="text-xs text-muted-foreground">Discuss challenges and proven solutions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">Open Experience Sharing</h4>
                      <p className="text-xs text-muted-foreground">Collaborative environment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">OpenAI Leadership</h4>
                      <p className="text-xs text-muted-foreground">Industry insights and perspectives</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-16 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground font-medium">
                    Limited to 50 executive members
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form - Right Side */}
          <div className="lg:col-span-2">
            <Card className="h-full border-2 border-purple-400/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20 relative overflow-hidden">
              {/* Urgency Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                LIMITED SPOTS
              </div>
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">
                  <Mail className="w-6 h-6 inline mr-2" />
                  Secure Your Spot
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Join San Diego&apos;s premier AI executive network
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm">Company *</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm">Your Role *</Label>
                    <Input
                      id="role"
                      type="text"
                      placeholder="e.g., Chief AI Officer, VP of AI, CTO"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-10"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                    size="lg" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'JOIN NEXT ROUNDTABLE OR FUTURE ONES'}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Questions? Contact{' '}
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
          </div>
        </div>

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