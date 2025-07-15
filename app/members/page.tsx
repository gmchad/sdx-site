'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import MemberCard from '@/app/components/MemberCard';
import membersData from '@/data/members.json';
import { Users, Star, Building, Calendar, Search, ExternalLink } from 'lucide-react';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredMembers = membersData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFeatured = !featuredOnly || member.featured;
    
    return matchesSearch && matchesFeatured;
  });

  const featuredMembers = membersData.filter(member => member.featured);
  const companies = Array.from(new Set(membersData.map(member => member.company)));
  const allSkills = Array.from(new Set(membersData.flatMap(member => member.skills)));

  return (
    <main className="relative bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Community Members
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Meet the talented AI builders, entrepreneurs, and innovators who make our community extraordinary
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <CardTitle className="text-3xl font-bold text-blue-400">
                {membersData.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Community Members</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <CardTitle className="text-3xl font-bold text-yellow-400">
                {featuredMembers.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Featured Members</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Building className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-3xl font-bold text-green-400">
                {companies.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Companies</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <CardTitle className="text-3xl font-bold text-purple-400">
                {new Date().getFullYear() - 2022}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Years Growing</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Member Spotlight */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMembers.slice(0, 3).map(member => (
              <Card key={member.id} className="border-yellow-500">
                <CardHeader>
                  <Badge className="w-fit mb-2">⭐ Featured</Badge>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-muted-foreground">{member.title}</p>
                  <Badge variant="secondary">{member.company}</Badge>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-muted-foreground mb-4">
                    "{member.testimonial}"
                  </blockquote>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <Card className="mb-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join Our Community</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded AI builders, share knowledge, and grow together in our supportive community
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

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={featuredOnly ? 'default' : 'outline'}
            onClick={() => setFeaturedOnly(!featuredOnly)}
          >
            <Star className="w-4 h-4 mr-2" />
            Featured Only
          </Button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              title={member.title}
              company={member.company}
              bio={member.bio}
              photoUrl={member.photoUrl}
              location={member.location}
              skills={member.skills}
              testimonial={member.testimonial}
              linkedin={member.linkedin}
              github={member.github}
              twitter={member.twitter}
              portfolio={member.portfolio}
              joinedYear={member.joinedYear}
              featured={member.featured}
            />
          ))}
        </div>

        {/* No Members Message */}
        {filteredMembers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Members Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to see more members.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Skills Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Skills</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {allSkills.slice(0, 20).map(skill => {
              const skillCount = membersData.filter(m => m.skills.includes(skill)).length;
              return (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill} ({skillCount})
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Community Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {membersData.filter(m => m.testimonial).slice(0, 4).map(member => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{member.testimonial}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.title}, {member.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Member Nomination */}
        <Card className="mt-16 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Nominate a Member</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Know someone who's making a great impact in our community? Nominate them for a member spotlight!
            </p>
            <Button size="lg" asChild>
              <Link href="mailto:community@sdx.ai?subject=Member Nomination">
                Nominate a Member
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 