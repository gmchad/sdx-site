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
        <div className="text-center mb-16">
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

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <CardTitle className="text-3xl font-bold text-blue-400">1000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">AI Builders in Network</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <CardTitle className="text-3xl font-bold text-yellow-400">50</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Executive Member Limit</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-3xl font-bold text-green-400">4</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Roundtables per Year</p>
            </CardContent>
          </Card>
        </div>

        {/* Apply to Join */}
        <Card className="max-w-2xl mx-auto mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <Mail className="w-6 h-6 inline mr-2" />
              Apply To Join
            </CardTitle>
            <p className="text-center text-muted-foreground">
              We cap the executive network at 50 members and are very particular about who&apos;s part of the community to ensure the most high quality experience. No cost to join, funded and sponsored by our technology partners. Apply Below.
            </p>
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

        {/* What we Offer */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">What we Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Quarterly Executive Roundtables</h3>
                <p className="text-muted-foreground text-sm">
                  Exclusive strategic discussions with fellow AI executives on implementation, trends, and industry insights
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-lg font-semibold mb-2">Access to San Diego&apos;s top AI Builders</h3>
                <p className="text-muted-foreground text-sm">
                  SDx has a thriving community of the most talented AI engineers, researchers, and product folks with 1000+ members. We work to connect you with them.
                </p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Innovation & Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Early access to breakthrough technologies and research emerging from our builder community
                </p>
              </div>
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