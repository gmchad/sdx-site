'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Linkedin, Github, Twitter, Globe, Users, Star } from 'lucide-react';

// Spotlight members data
const spotlightMembers = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    title: "Co-founder & CTO",
    company: "Echo Chunk",
    bio: "AI engineer passionate about voice processing and real-time audio analysis. Previously worked at Google DeepMind before starting Echo Chunk at an SDx hackathon.",
    photoUrl: "/members/alex-chen.jpg",
    skills: ["Machine Learning", "Audio Processing", "Python", "TensorFlow"],
    testimonial: "SDx has been instrumental in connecting me with like-minded AI builders. The community's support helped turn our hackathon project into a successful startup.",
    linkedin: "https://linkedin.com/in/alexchen",
    github: "https://github.com/alexchen",
  },
  {
    id: "sarah-rodriguez",
    name: "Sarah Rodriguez",
    title: "Co-founder & CEO",
    company: "Echo Chunk",
    bio: "Business leader with a background in AI product development. Expertise in scaling AI companies and building enterprise partnerships.",
    photoUrl: "/members/sarah-rodriguez.jpg",
    skills: ["Product Management", "AI Strategy", "Enterprise Sales", "Leadership"],
    testimonial: "The SDx community provided the perfect environment for technical and business minds to collaborate. It's where innovation meets execution.",
    linkedin: "https://linkedin.com/in/sarahrodriguez",
    twitter: "https://twitter.com/sarahrodriguez",
  },
  {
    id: "david-kim",
    name: "David Kim",
    title: "Open Source Maintainer",
    company: "Big AGI",
    bio: "Full-stack developer and open source advocate. Maintainer of Big AGI, one of the most popular open-source AI interfaces with 15K+ GitHub stars.",
    photoUrl: "/members/david-kim.jpg",
    skills: ["React", "Node.js", "AI APIs", "Open Source"],
    testimonial: "SDx's open and collaborative culture inspired me to create Big AGI. The community's feedback and contributions have been invaluable.",
    linkedin: "https://linkedin.com/in/davidkim",
    github: "https://github.com/davidkim",
  },
  {
    id: "michael-park",
    name: "Michael Park",
    title: "CEO & Founder",
    company: "Chat Shape",
    bio: "Serial entrepreneur with expertise in SaaS and AI. Previously sold two startups before founding Chat Shape, a no-code chatbot builder.",
    photoUrl: "/members/michael-park.jpg",
    skills: ["Entrepreneurship", "SaaS", "AI Chatbots", "No-Code"],
    testimonial: "The SDx community's entrepreneurial spirit is contagious. The connections I've made here have been crucial to Chat Shape's success.",
    linkedin: "https://linkedin.com/in/michaelpark",
    twitter: "https://twitter.com/michaelpark",
  },
  {
    id: "ryan-chang",
    name: "Ryan Chang",
    title: "AI Research Engineer",
    company: "Neural Search",
    bio: "AI researcher focused on semantic search and information retrieval. Former research scientist at OpenAI with expertise in transformer models.",
    photoUrl: "/members/ryan-chang.jpg",
    skills: ["Deep Learning", "Search Algorithms", "PyTorch", "Research"],
    testimonial: "SDx attracts top-tier AI talent from around the world. The technical discussions and collaborations here push the boundaries of what's possible.",
    linkedin: "https://linkedin.com/in/ryanchang",
    github: "https://github.com/ryanchang",
  },
  {
    id: "maria-gonzalez",
    name: "Maria Gonzalez",
    title: "VP of Engineering",
    company: "Code Mentor",
    bio: "Engineering leader with expertise in scaling technical teams and building educational technology. Advocate for diversity in tech.",
    photoUrl: "/members/maria-gonzalez.jpg",
    skills: ["Engineering Leadership", "EdTech", "Team Building", "Diversity & Inclusion"],
    testimonial: "SDx's commitment to diversity and inclusion creates an environment where everyone can thrive and contribute their unique perspectives.",
    linkedin: "https://linkedin.com/in/mariagonzalez",
    twitter: "https://twitter.com/mariagonzalez",
  }
];

interface MemberCardProps {
  member: typeof spotlightMembers[0];
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
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
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
          <span className="text-2xl font-bold hidden">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <p className="text-muted-foreground">{member.title}</p>
        <Badge variant="secondary" className="w-fit mx-auto">{member.company}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {member.bio}
        </p>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <blockquote className="text-sm italic text-muted-foreground text-center">
            "{member.testimonial}"
          </blockquote>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {member.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {member.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{member.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2 justify-center pt-2">
          {member.linkedin && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {member.github && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={member.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {member.twitter && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function MembersPage() {
  return (
    <main className="relative bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <Star className="w-4 h-4 mr-2" />
            Member Spotlight
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our 
            <span className="text-blue-400"> AI Builders</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Get to know the talented entrepreneurs, engineers, and innovators who are shaping the future of AI in San Diego
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
              <p className="text-muted-foreground">Active Builders</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <CardTitle className="text-3xl font-bold text-yellow-400">15+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Startups Launched</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Badge className="w-12 h-12 mx-auto mb-4 text-green-500 flex items-center justify-center">
                AI
              </Badge>
              <CardTitle className="text-3xl font-bold text-green-400">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Projects Showcased</p>
            </CardContent>
          </Card>
        </div>

        {/* Spotlight Members */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Spotlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotlightMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Join Our Community</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to connect with San Diego's most innovative AI builders? Join our community and be part of the next generation of AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://lu.ma/sdx" target="_blank">
                  Join Community
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank">
                  Join Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Member Nomination CTA */}
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Know an Amazing Builder?</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help us discover more incredible AI builders in our community. Nominate someone who's making an impact and deserves recognition.
            </p>
            <Button size="lg" asChild>
              <Link href="mailto:community@sdx.community?subject=Member Spotlight Nomination">
                Nominate a Member
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 