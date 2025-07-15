# SDx Community Website - Site Map

## 🏗️ Current Implementation Status

### ✅ **Completed Pages**
- **Home Page** (`/`) - Dual-path hero with shadcn/ui components
- **Executives Page** (`/executives`) - Complete executive landing page
- **Components** - All core components refactored with shadcn/ui

### 🟡 **In Progress**
- **Chapters Overview** (`/chapters`) - Needs enhancement
- **UCSD Chapter** (`/chapters/ucsd`) - Exists but needs shadcn/ui update

### ⚪ **Planned Pages**
- **Events Page** (`/events`) - Lu.ma integration
- **Startups Page** (`/startups`) - Success stories showcase
- **Members Page** (`/members`) - Member profiles and spotlight

---

## 📁 File Structure

```
sdx-site/
├── app/
│   ├── layout.tsx                    ✅ Updated with Navigation
│   ├── page.tsx                      ✅ Updated with HeroSection
│   ├── logobar.tsx                   ✅ Updated with shadcn theming
│   ├── globals.css                   ✅ Updated with shadcn variables
│   │
│   ├── components/                   ✅ NEW - Reusable components
│   │   ├── Navigation.tsx           ✅ Complete - shadcn Sheet & Button
│   │   ├── HeroSection.tsx          ✅ Complete - shadcn Cards
│   │   ├── EventCard.tsx            ✅ Complete - shadcn Card structure
│   │   ├── StartupCard.tsx          ✅ Complete - shadcn Cards & Badges
│   │   ├── MemberCard.tsx           ⚪ Planned
│   │   └── ExecutiveForm.tsx        ⚪ Planned
│   │
│   ├── executives/
│   │   └── page.tsx                 ✅ Complete - shadcn Cards & Buttons
│   │
│   ├── events/
│   │   └── page.tsx                 ⚪ Planned - Lu.ma integration
│   │
│   ├── startups/
│   │   └── page.tsx                 ⚪ Planned - Success stories
│   │
│   ├── members/
│   │   └── page.tsx                 ⚪ Planned - Member profiles
│   │
│   └── chapters/
│       ├── page.tsx                 🟡 Needs enhancement
│       ├── ucsd/
│       │   └── page.tsx            🟡 Needs shadcn/ui update
│       └── [slug]/
│           └── page.tsx            ⚪ Planned - Dynamic chapters
│
├── components/ui/                    ✅ NEW - shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── sheet.tsx
│   ├── badge.tsx
│   ├── separator.tsx
│   └── form.tsx
│
├── data/                            ⚪ Planned - Static data files
│   ├── startups.json
│   ├── members.json
│   ├── chapters.json
│   └── metrics.json
│
├── lib/
│   └── utils.ts                     ✅ shadcn/ui utilities
│
└── public/
    ├── sdx-v2.png                   ✅ Main logo
    ├── sdx-logo-white.svg          ✅ Navigation logo
    └── sponsors/                    ✅ Sponsor logos
```

---

## 🎯 Page Details & Features

### **Home Page (`/`)**
**Status**: ✅ Complete
- **Hero Section**: Dual-path design (Builders vs Executives)
- **Impact Metrics**: 1000+ members, 50+ events, 15+ startups
- **Social Links**: Discord, Twitter with proper analytics
- **Sponsor Bar**: Animated marquee with sponsor logos
- **Bottom CTA**: AI talent network link

### **Executives Page (`/executives`)**
**Status**: ✅ Complete
- **Value Propositions**: 3-column grid with icons
- **Success Stories**: Startup metrics and achievements
- **Process Flow**: 4-step partnership process
- **CTA Section**: Consultation booking and talent network access

### **Events Page (`/events`)**
**Status**: ⚪ Planned
- **Lu.ma Integration**: Live event feed or iframe
- **Event Filtering**: Past/Future, Type, Date filters
- **Event Cards**: Using EventCard component
- **Hackathon Highlights**: Special event showcases
- **Registration CTAs**: Direct event sign-up

### **Startups Page (`/startups`)**
**Status**: ⚪ Planned
- **Startup Grid**: Using StartupCard component
- **Success Stories**: Echo Chunk, Big AGI, Chat Shape
- **Metrics Dashboard**: Funding, users, revenue stats
- **Filtering**: By stage, industry, metrics
- **Join Network CTA**: Connection opportunities

### **Members Page (`/members`)**
**Status**: ⚪ Planned
- **Member Profiles**: Photo, bio, testimonials
- **Member Spotlight**: Rotating featured members
- **Search & Filter**: By skills, location, interests
- **Nominate Form**: Member nomination process
- **Testimonials**: Community feedback

### **Chapters Page (`/chapters`)**
**Status**: 🟡 Needs Enhancement
- **Chapters Overview**: University partnerships
- **UCSD Chapter**: Enhanced existing page
- **Future Chapters**: Expansion plans
- **Chapter Application**: New chapter process
- **Dynamic Routes**: `/chapters/[slug]` for each university

---

## 🧩 Component Architecture

### **Navigation.tsx**
- **Desktop Menu**: Ghost buttons for main navigation
- **Mobile Menu**: Sheet component with full-screen overlay
- **CTAs**: Join Community + For Executives buttons
- **Analytics**: Click tracking for all links

### **HeroSection.tsx**
- **Dual Cards**: Builders vs Executives paths
- **Impact Metrics**: Community statistics
- **Social Links**: Icon buttons for platforms
- **Responsive**: Mobile-first design

### **EventCard.tsx**
- **Event Info**: Title, date, time, location
- **Status Badge**: Upcoming/Past indicator
- **Description**: Event details with truncation
- **CTA Button**: Learn More with external link

### **StartupCard.tsx**
- **Company Info**: Logo, name, category
- **Founders**: Badge list of founder names
- **Metrics Grid**: Funding, users, revenue display
- **Website Link**: External link button

---

## 🎨 Design System

### **shadcn/ui Components**
- **Button**: Primary, secondary, ghost, outline variants
- **Card**: Structured content containers
- **Badge**: Status indicators and tags
- **Sheet**: Mobile navigation overlay
- **Form**: Future contact/application forms

### **Color Scheme**
- **Primary**: Blue (#3b82f6) for builders
- **Secondary**: Green (#22c55e) for executives
- **Accent Colors**: Purple, yellow for metrics
- **Dark Mode**: Native support with CSS variables

### **Typography**
- **Headings**: Bold, hierarchical sizing
- **Body**: Muted foreground for readability
- **CTAs**: Emphasized button text

---

## 📊 Next Steps (Phase 2)

### **Immediate Tasks**
1. **Create Data Files** - startups.json, members.json, chapters.json
2. **Build Events Page** - Lu.ma integration
3. **Build Startups Page** - Success stories grid
4. **Build Members Page** - Profile showcase
5. **Enhance Chapters** - Update existing pages

### **Technical Integrations**
- **Lu.ma API**: Event management
- **HubSpot Forms**: Executive lead capture
- **Analytics**: Enhanced tracking
- **Performance**: Image optimization

### **Content Requirements**
- **10 Member Profiles**: Photos, bios, testimonials
- **15+ Startup Details**: Metrics, stories, logos
- **Event Data**: Past and upcoming events
- **Chapter Information**: University partnerships

---

## 🚀 Launch Readiness

### **Current State**
- ✅ **Foundation**: Navigation, layout, theming
- ✅ **Home Page**: Complete dual-path experience
- ✅ **Executive Track**: Professional landing page
- ✅ **Component Library**: Reusable shadcn/ui components
- ✅ **Mobile Responsive**: All current pages

### **Phase 2 Goals**
- 📅 **Events Integration**: Live event management
- 👥 **Member Showcase**: Community highlights
- 🚀 **Startup Stories**: Success case studies
- 🎓 **Chapter Expansion**: University partnerships
- 📊 **Analytics**: Enhanced tracking and insights

The site is now ready for Phase 2 with a solid foundation of professional, accessible, and maintainable components! 