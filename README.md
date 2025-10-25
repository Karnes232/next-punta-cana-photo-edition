# Punta Cana Photo Edition

A professional photography and videography services website built with Next.js, featuring bilingual support (English/Spanish) and a comprehensive content management system powered by Sanity CMS.

## 🌟 Features

### Photography Services

- **Wedding Photography & Video** - Professional wedding coverage with customizable packages
- **Photoshoots** - Individual and couple photoshoots in beautiful Punta Cana locations
- **Proposal Photography** - Capture your special moment with professional proposal photography
- **Corporate Events** - Business event photography and videography services
- **Wedding Planning** - Comprehensive wedding planning services

### Website Features

- 🌐 **Bilingual Support** - Full English and Spanish language support
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI/UX** - Elegant design with custom color palette
- 📸 **Image Galleries** - Interactive photo galleries with lightbox functionality
- 📝 **Blog/Stories** - Content management for blog posts and client stories
- 💬 **Contact Forms** - Service-specific inquiry forms
- ❓ **FAQ System** - Categorized frequently asked questions
- 🔍 **SEO Optimized** - Structured data and meta tags for search engines

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Next-intl** - Internationalization support

### Backend & CMS

- **Sanity CMS** - Headless content management system
- **Sanity Studio** - Content editing interface
- **GROQ** - Query language for content fetching

### UI Components & Libraries

- **Swiper** - Touch slider for galleries
- **React Icons** - Icon library
- **Lucide React** - Modern icon set
- **Yet Another React Lightbox** - Image lightbox component
- **Portable Text** - Rich text rendering

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-punta-cana-photo-edition
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Root layout group
│   │   ├── [locale]/            # Internationalized routes
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact page
│   │   │   ├── corporate-events/ # Corporate events
│   │   │   ├── faq/             # FAQ page
│   │   │   ├── photoshoots/     # Photoshoot services
│   │   │   ├── proposals/       # Proposal services
│   │   │   ├── stories/         # Blog/stories
│   │   │   ├── wedding-planning/ # Wedding planning
│   │   │   └── weddings/        # Wedding services
│   │   └── sitemap.ts           # Dynamic sitemap
│   ├── api/                      # API routes
│   └── studio/                   # Sanity Studio
├── components/                   # React components
│   ├── BlogComponents/          # Blog-related components
│   ├── Forms/                   # Contact and inquiry forms
│   ├── HeroComponent/           # Hero sections
│   ├── layout/                  # Layout components (Navbar, Footer)
│   ├── PhotoGrid/               # Image gallery components
│   ├── ServicesOfferedComponents/ # Service cards
│   └── TestimonialsComponents/  # Testimonial displays
├── i18n/                        # Internationalization config
├── middleware.ts                # Next.js middleware
└── sanity/                      # Sanity CMS configuration
    ├── lib/                     # Sanity utilities
    ├── queries/                 # GROQ queries
    └── schemaTypes/             # Content schemas
```

## 🎨 Design System

### Color Palette

- **Elegant Silver** (#C0C0C0) - Primary accent
- **Dark Gray** (#2C2C2C) - Text and headings
- **Luxury Gold** (#D4AF37) - Premium accents
- **Caribbean Turquoise** (#40E0D0) - Call-to-action elements
- **Pure White** (#FFFFFF) - Background

### Typography

- **Crimson Pro** - Serif font for headings
- **Montserrat** - Sans-serif for body text

## 📝 Content Management

### Sanity Studio

Access the content management interface at `/studio` to:

- Manage blog posts and stories
- Update service packages and pricing
- Edit testimonials and client reviews
- Configure SEO settings
- Manage FAQ categories and questions

### Content Types

- **Homepage** - Hero sections, galleries, testimonials
- **Services** - Photography packages and pricing
- **Blog Posts** - Stories and client features
- **Testimonials** - Client reviews and feedback
- **FAQ** - Categorized frequently asked questions
- **SEO** - Meta tags and structured data

## 🌐 Internationalization

The website supports two languages:

- **English** (default) - `/`
- **Spanish** - `/es`

Language switching is handled automatically based on URL paths and user preferences.

## 🚀 Deployment

### Build Commands

```bash
# Standard build
npm run build

# Turbopack build (faster)
npm run buildTurbopack

# Start production server
npm run start
```

### Performance Optimizations

- **Static Generation** - Pre-rendered pages for optimal performance
- **Image Optimization** - Next.js Image component with Sanity CDN
- **Caching Headers** - Configured for 3-day cache with stale-while-revalidate
- **Bundle Optimization** - Tree-shaking and code splitting

## 📊 SEO Features

- **Structured Data** - JSON-LD markup for search engines
- **Meta Tags** - Dynamic title, description, and Open Graph tags
- **Sitemap** - Auto-generated XML sitemap
- **Robots.txt** - Search engine crawling instructions
- **Canonical URLs** - Proper URL canonicalization

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run buildTurbopack # Build with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile** - 320px and up
- **Tablet** - 768px and up
- **Desktop** - 1024px and up
- **Large Desktop** - 1280px and up

## 🔧 Customization

### Adding New Services

1. Create new schema in `src/sanity/schemaTypes/`
2. Add queries in `src/sanity/queries/`
3. Create components in `src/components/`
4. Add routes in `src/app/(root)/[locale]/`

### Styling

- Modify `tailwind.config.ts` for design system changes
- Update component styles in individual component files
- Global styles in `src/app/globals.css`

## 📄 License

This project is private and proprietary to Punta Cana Photo Edition.

## 🤝 Support

For technical support or questions about the website, please contact the development team.

---

Built with ❤️ using Next.js, Sanity CMS, and modern web technologies.
