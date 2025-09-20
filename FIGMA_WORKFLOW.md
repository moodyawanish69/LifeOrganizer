# Figma to VS Code Workflow Guide

This guide explains how to efficiently transfer designs and assets from Figma to your VS Code LifeOrganizer project.

## 🚀 Quick Setup

### 1. Install Required VS Code Extensions
The project includes recommended extensions in `.vscode/extensions.json`. Install them via:
- `Ctrl+Shift+P` → "Extensions: Show Recommended Extensions"
- Install all recommended extensions

### 2. Project Structure Overview
```
src/
├── components/
│   ├── figma/
│   │   ├── ImageWithFallback.tsx     # Use for all images
│   │   └── imports/                  # Figma assets go here
│   │       ├── icons/               # SVG icons
│   │       ├── images/              # Image assets
│   │       ├── components/          # React components
│   │       └── assets/              # Other assets
│   └── ui/                          # ShadCN components
└── lib/
    ├── utils.ts                     # Utility functions
    ├── types.ts                     # TypeScript types
    └── constants.ts                 # App constants
```

## 📦 Asset Export from Figma

### Icons & SVGs
1. **Select icon in Figma**
2. **Export as SVG** (24x24 or original size)
3. **Save to:** `/src/components/figma/imports/icons/`
4. **Naming:** Use kebab-case (e.g., `arrow-right.svg`, `user-profile.svg`)

### Images
1. **Select image/component in Figma**
2. **Export as PNG/JPG** (2x for retina)
3. **Save to:** `/src/components/figma/imports/images/`
4. **Naming:** Descriptive names (e.g., `hero-banner.png`, `dashboard-screenshot.jpg`)

### Components (React Code)
1. **Use Figma's "Dev Mode"** or export plugins
2. **Copy generated React code**
3. **Save to:** `/src/components/figma/imports/components/`
4. **Clean up imports and styling**

## 🔧 Integration in Code

### Using Icons
```tsx
// Import SVG as React component
import ArrowIcon from '@/components/figma/imports/icons/arrow-right.svg';

// Or import inline
import { ReactComponent as UserIcon } from '@/components/figma/imports/icons/user-profile.svg';

function MyComponent() {
  return (
    <div>
      <ArrowIcon className="w-5 h-5" />
      <UserIcon className="w-6 h-6 text-blue-600" />
    </div>
  );
}
```

### Using Images
```tsx
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import heroImage from '@/components/figma/imports/images/hero-banner.png';

function HeroSection() {
  return (
    <ImageWithFallback
      src={heroImage}
      alt="Hero banner"
      className="w-full h-auto"
      fallback="/placeholder-image.png"
    />
  );
}
```

### Using Figma Components
```tsx
// Import generated component
import { FigmaCard } from '@/components/figma/imports/components/card';

// Refactor to use project's design system
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function MyComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h3>Title from Figma</h3>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
    </Card>
  );
}
```

## 🎨 Design System Integration

### Colors
Use the predefined color palette from `globals.css`:
```tsx
// Instead of hardcoded colors from Figma
className="bg-[#3b82f6]" // ❌ Don't do this

// Use design system colors
className="bg-primary" // ✅ Do this
className="text-productivity-blue" // ✅ Or this
```

### Typography
Follow the typography system in `globals.css`:
```tsx
// Headings use Poppins automatically
<h1>Main Title</h1>
<h2>Section Title</h2>

// Body text uses Inter automatically  
<p>Body content</p>

// Override only when necessary
<h1 className="text-3xl font-bold">Custom heading</h1>
```

### Spacing & Layout
Use Tailwind's spacing system:
```tsx
// Instead of exact pixels from Figma
style={{ margin: '24px' }} // ❌ Don't do this

// Use Tailwind spacing
className="m-6 p-4 gap-3" // ✅ Do this
```

## 🔄 Workflow Best Practices

### 1. Asset Organization
- **Group by feature:** Create subfolders for related assets
- **Consistent naming:** Use kebab-case for all files
- **Optimize assets:** Compress images, minify SVGs

### 2. Code Quality
- **Review generated code:** Clean up Figma's output
- **Use TypeScript:** Add proper types for components
- **Follow conventions:** Match existing code style

### 3. Responsive Design
- **Mobile-first:** Start with mobile layout
- **Breakpoints:** Use Tailwind's responsive prefixes
- **Flexible units:** Use rem, em, % instead of fixed pixels

### 4. Performance
- **Lazy loading:** Use React.lazy for large components
- **Image optimization:** Use WebP format when possible
- **Bundle splitting:** Keep components modular

## 🛠️ Development Tools

### VS Code Configuration
The project includes optimized VS Code settings:
- **Auto-formatting** on save (Prettier)
- **ESLint** for code quality
- **Tailwind CSS** IntelliSense
- **TypeScript** support with path mapping

### Useful Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

### File Path Aliases
Use `@/` for cleaner imports:
```tsx
// Instead of relative paths
import { Button } from '../../../ui/button'; // ❌

// Use alias paths  
import { Button } from '@/components/ui/button'; // ✅
```

## 📋 Checklist for New Assets

- [ ] Assets exported in correct format and size
- [ ] Files saved in appropriate directories
- [ ] Consistent naming convention used
- [ ] Images optimized for web
- [ ] Components refactored to use design system
- [ ] TypeScript types added where needed
- [ ] Responsive design implemented
- [ ] Accessibility attributes added
- [ ] Performance considerations addressed
- [ ] Code tested in both light and dark themes

## 🎯 Tips for Success

1. **Start small:** Import one component at a time
2. **Test frequently:** Check in browser during development
3. **Stay consistent:** Follow existing patterns in the codebase
4. **Document changes:** Update this guide as you learn
5. **Ask for help:** Use VS Code's IntelliSense and error messages

Happy coding! 🚀