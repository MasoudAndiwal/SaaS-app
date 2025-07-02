# EstateFlow - Modern Real Estate Platform

A modern, responsive real estate platform built with Next.js 14, Tailwind CSS, and ShadCN UI components. This platform allows users to buy, sell, and rent properties with an intuitive and beautiful interface.

## 🌟 Features

### Core Functionality
- **Property Listings**: Browse properties with advanced filtering (location, price, type, bedrooms, etc.)
- **Property Details**: Detailed property pages with image galleries, maps, and contact forms
- **List Properties**: Comprehensive form for posting new listings with image upload
- **User Authentication**: Sign-in/Sign-up pages with social authentication support
- **Search & Filters**: Advanced search with multiple filter options
- **Responsive Design**: Mobile-first design that works on all devices

### User Features
- **Property Management**: Dashboard for managing user properties
- **Favorites**: Save favorite properties for later viewing
- **Messaging**: Chat interface between buyers and sellers
- **Multiple Views**: Grid and list views for property browsing
- **Interactive Maps**: Property locations with map integration

### Technical Features
- **Modern UI**: Clean, professional design with smooth animations
- **Fast Performance**: Optimized with Next.js 14 App Router
- **Type Safety**: Full TypeScript implementation
- **Responsive**: Mobile-first design approach
- **Accessible**: Built with accessibility in mind

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **UI Components**: ShadCN UI (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (optional for prototyping)
- **Authentication**: Supabase Auth (optional)
- **Maps**: React Map GL (optional)
- **Animations**: Framer Motion

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth route group
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   ├── properties/              # Properties listing
│   │   └── [id]/               # Individual property page
│   ├── sell/                   # List/sell property form
│   ├── dashboard/              # User dashboard
│   ├── favorites/              # Saved properties
│   ├── messages/               # Chat interface
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   ├── layout/                 # Layout components
│   │   ├── navbar.tsx          # Navigation bar
│   │   └── footer.tsx          # Footer
│   ├── sections/               # Page sections
│   │   ├── hero.tsx            # Hero section
│   │   ├── featured-properties.tsx
│   │   ├── stats.tsx           # Statistics section
│   │   └── cta.tsx             # Call-to-action
│   ├── property/               # Property-related components
│   │   ├── property-card.tsx   # Property listing card
│   │   ├── property-grid.tsx   # Properties grid
│   │   ├── property-filters.tsx # Filter components
│   │   └── property-search.tsx # Search component
│   ├── forms/                  # Form components
│   │   ├── contact-form.tsx    # Contact forms
│   │   ├── property-form.tsx   # Property listing form
│   │   └── search-form.tsx     # Search form
│   └── ui/                     # Base UI components (ShadCN)
│       ├── button.tsx          # Button component
│       ├── input.tsx           # Input component
│       ├── card.tsx            # Card component
│       ├── dialog.tsx          # Modal/Dialog
│       ├── select.tsx          # Select dropdown
│       ├── checkbox.tsx        # Checkbox
│       └── ...                 # Other ShadCN components
├── lib/                        # Utilities and configurations
│   ├── utils.ts               # Utility functions
│   ├── supabase.ts            # Supabase client (optional)
│   └── validations.ts         # Form validation schemas
├── types/                      # TypeScript type definitions
│   └── index.ts               # Common types and interfaces
├── public/                     # Static assets
│   ├── images/                # Image assets
│   └── icons/                 # Icon assets
├── constants/                  # App constants
│   └── index.ts               # Static data and enums
└── hooks/                      # Custom React hooks
    ├── useProperties.ts       # Property data hooks
    ├── useAuth.ts             # Authentication hooks
    └── useLocalStorage.ts     # Local storage hook
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/real-estate-platform.git
cd real-estate-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Install ShadCN UI components** (if needed)
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add toast
```

4. **Set up environment variables** (optional)
```bash
# Create .env.local file
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open in browser**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple gradient (#a855f7 to #9333ea)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray shades

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Mobile-optimized font sizes

### Components
- **Rounded Corners**: 2xl (1rem) for cards and buttons
- **Shadows**: Layered shadow system for depth
- **Spacing**: Consistent 4px grid system
- **Animations**: Smooth transitions and hover effects

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with search bar
- Featured properties
- Statistics section
- Call-to-action section

### Properties (`/properties`)
- Property listings with grid/list view
- Advanced filtering system
- Search functionality
- Pagination

### Property Details (`/properties/[id]`)
- Image gallery with lightbox
- Property information and amenities
- Interactive map
- Contact form
- Related properties

### List Property (`/sell`)
- Comprehensive property listing form
- Image upload with drag & drop
- Form validation
- Preview functionality

### Authentication (`/auth/signin`, `/auth/signup`)
- Email/password authentication
- Social login options
- Form validation
- Forgot password functionality

### User Dashboard (`/dashboard`)
- Property management
- User profile
- Messages overview
- Analytics (for agents)

### Favorites (`/favorites`)
- Saved properties
- Quick actions
- Sharing functionality

### Messages (`/messages`)
- Real-time chat interface
- Property-specific conversations
- File sharing capabilities

## 🔧 Customization

### Adding New Components
1. Create component in appropriate directory
2. Add TypeScript types
3. Include in component exports
4. Add to Storybook (if applicable)

### Modifying Styles
1. Update Tailwind config for global changes
2. Use CSS custom properties for theming
3. Extend component variants in `globals.css`

### Adding New Pages
1. Create page in `app/` directory
2. Add to navigation if needed
3. Include in sitemap
4. Add appropriate metadata

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx/Apache)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Lucide React](https://lucide.dev/) for icons
- [Supabase](https://supabase.com/) for backend services
- [Vercel](https://vercel.com/) for hosting platform

## 📞 Support

For support, email support@estateflow.com or join our Slack channel.

---

**Built with ❤️ for the real estate community**
