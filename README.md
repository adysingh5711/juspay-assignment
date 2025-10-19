# Juspay Assignment - Modern SaaS Dashboard

A pixel-perfect implementation of a modern SaaS dashboard built with React, TypeScript, and Tailwind CSS. This project demonstrates advanced React patterns, performance optimizations, and comprehensive user experience features.

### Deployed Link - [juspay-ui-designer-assignment-aditya.vercel.app](https://juspay-ui-designer-assignment-aditya.vercel.app)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build and Deployment](#build-and-deployment)
- [Design Decisions](#design-decisions)
- [Performance Optimizations](#performance-optimizations)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project implements a comprehensive SaaS dashboard with advanced data visualization, real-time analytics, and modern user interface patterns. The application features a responsive design that works seamlessly across desktop, tablet, and mobile devices.

### Key Highlights

- **Pixel-Perfect Implementation**: Exact match to provided Figma designs
- **Advanced State Management**: Context API with optimized re-rendering
- **Performance Optimized**: Code splitting, lazy loading, and efficient rendering
- **Accessibility Compliant**: WCAG 2.1 AA standards with keyboard navigation
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Modern Architecture**: Clean separation of concerns and modular components

## Features

### Core Functionality
- **Dashboard Analytics**: Comprehensive data visualization with multiple chart types
- **Order Management**: Advanced data table with search, filtering, sorting, and pagination
- **Theme System**: Dark and light mode with persistent user preferences
- **Responsive Navigation**: Collapsible sidebar with smooth animations
- **Real-time Updates**: Live data updates with smooth transitions

### Advanced Features
- **Search and Filtering**: Multi-criteria search across all data fields
- **Data Sorting**: Multi-column sorting with visual indicators
- **Pagination**: Efficient data pagination with configurable page sizes
- **Row Selection**: Bulk operations with select all functionality
- **Microinteractions**: Smooth animations and hover effects using Framer Motion
- **Performance Monitoring**: Built-in analytics and performance insights

### Data Visualization
- **Revenue Analytics**: Interactive charts with drill-down capabilities
- **Geographic Mapping**: Location-based revenue visualization
- **Product Analytics**: Top-selling products with detailed metrics
- **Projection Analysis**: Actual vs projected performance tracking
- **Sales Distribution**: Pie charts for sales category breakdown

## Technical Stack

### Core Technologies
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 4.9.5**: Full type safety and enhanced developer experience
- **Vite 7.1.10**: Fast build tool with HMR and optimized bundling
- **Tailwind CSS 4.1.14**: Utility-first CSS framework for rapid styling

### UI and Animation
- **Framer Motion 12.23.6**: Production-ready motion library for animations
- **Phosphor React 1.4.1**: Comprehensive icon library
- **Recharts 3.1.0**: Composable charting library for data visualization
- **React Leaflet 5.0.0**: Interactive maps with Leaflet integration

### Development Tools
- **Prettier 3.6.2**: Code formatting and consistency
- **PostCSS 8.5.6**: CSS processing and optimization
- **Autoprefixer 10.4.21**: Automatic vendor prefixing

### Performance and Analytics
- **Vercel Analytics**: Real-time performance monitoring
- **Vercel Speed Insights**: Core Web Vitals tracking
- **Web Vitals 2.1.4**: Performance metrics collection

## Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── graph/              # Chart-specific components
│   ├── search-input.tsx    # Search functionality
│   ├── separator.tsx       # Visual separators
│   ├── sidebar.tsx         # Sidebar component
│   └── table.tsx           # Data table components
├── modules/                 # Feature-based modules
│   ├── components/         # Shared layout components
│   ├── contexts/           # React Context providers
│   ├── left-sidebar/       # Navigation sidebar
│   ├── main/              # Main application views
│   │   ├── home/          # Dashboard home
│   │   └── order-list/    # Order management
│   ├── navbar/            # Top navigation
│   └── right-sidebar/     # Activity sidebar
├── router.tsx              # Application routing
├── App.tsx                 # Root component
└── index.tsx              # Application entry point
```

### Architecture Principles

- **Feature-Based Organization**: Components grouped by functionality
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Reusability**: Shared components for consistent UI patterns
- **Scalability**: Modular structure for easy feature additions

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adysingh5711/juspay-assignment.git
   cd juspay-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`


## Development

### Development Workflow

1. **Code Organization**: Follow the established module structure
2. **TypeScript**: Maintain strict type safety throughout
3. **Component Design**: Create reusable, composable components
4. **Performance**: Optimize for minimal re-renders and fast loading
5. **Accessibility**: Ensure WCAG 2.1 AA compliance

### Code Quality Standards

- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Consistent code formatting across the project
- **TypeScript**: Strict mode enabled for maximum type safety
- **Component Documentation**: JSDoc comments for all public APIs


## Build and Deployment

### Production Build

```bash
# Create optimized production build
npm run build
```

The build process includes:
- TypeScript compilation
- Code minification and optimization
- Asset optimization and compression
- Source map generation (disabled for production)
- Bundle analysis and chunk optimization

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Environment Configuration

The application supports multiple environments:

- **Development**: `npm run dev` - Hot reload and debugging
- **Production**: `npm run build` - Optimized for performance
- **Preview**: `npm run preview` - Local production testing

## Design Decisions

### Architecture Choices

**React Router v6**: Selected for its modern API, better TypeScript support, and improved performance over v5. The nested routing structure provides better code organization and shared layout components.

**Context API over Redux**: Chose React Context for state management due to the application's moderate complexity. This reduces bundle size while maintaining excellent developer experience and performance.

**Tailwind CSS**: Implemented for rapid development and consistent design system. The utility-first approach ensures maintainable styles and responsive design.

**Framer Motion**: Selected for production-ready animations with excellent performance. Provides smooth microinteractions without impacting bundle size significantly.

### UX/UI Design Decisions

**Enhanced Navigation Structure**: Took the liberty to add an "Orders" section in the Left Sidebar under Dashboard to provide better user experience and logical navigation flow. This addition allows users to quickly access order management functionality directly from the main navigation.

**Dynamic Right Sidebar Sections**: Implemented an animated section reordering system for the right sidebar. When users click on "Activities" or "Notifications", the selected section smoothly animates to the top, providing an intuitive and engaging user experience while maintaining visual hierarchy.

**Consistent Navigation Patterns**: Added a "Recently" option in the left sidebar to maintain consistency across the navigation structure, ensuring users have quick access to recently viewed items and maintaining a cohesive design language.

**Focused Page Implementation**: While the Figma design included 5 pages at the bottom, strategically implemented only two pages to demonstrate full functionality without redundant data. This approach showcases the complete feature set while maintaining clean, purposeful content.

**Enhanced Row Selection Visibility**: Modified the selected row color from the original Figma design to provide better visual feedback and highlight selection more prominently. This improvement enhances user experience by making it clearer which rows are selected, improving the overall usability of the table interface.

## Challenges Faced

**SubList Icon Spacing Complexity**
- What was wrong: sub-items had reserved spacing in Figma but no icons, causing alignment issues.
- Wrong approach: adding padding directly led to inconsistent spacing across breakpoints.
- Correct approach: use an empty placeholder container (e.g. `<div className="size-4"></div>`) so sub-items reserve the same space as iconed items, keeping alignment responsive and consistent.

**Data Integrity in Sorting**
- What was wrong: repeated IDs in the design caused sorting to group identical items incorrectly.
- Wrong approach: relying on design-provided IDs without normalization.
- Correct approach: ensure unique identifiers in the data model before sorting so sorting behaves predictably while preserving the visual dataset.

**Responsive Icon Management**
- What was wrong: icons and non-icon items misaligned across screen sizes.
- Wrong approach: fixed-size containers or extra padding that broke layout at different widths.
- Correct approach: size containers consistently (and use responsive utilities) so both icon and non-icon states maintain proper alignment and spacing.

**Table row hover / border handling**
- What was wrong: cell-level radius/padding were overridden by table-level styles, so hovering removed only part of the border.
- Wrong approach: using `divide-y`, `border-b` or `border-y` caused partial removals, jumps, or global side-effects.
- Correct approach: render rows with `border-t` (skip first) and on hover remove that row's top border plus the next row's top border via `[&>tr:hover+tr]:border-t-0`; keep an explicit header bottom border.

## Improvements Made

### Enhanced User Experience

**Navigation Enhancement**: Added a dedicated button in the left sidebar to navigate to the second page of the assignment, providing clear user flow and easy access to the order management functionality.

**Integrated Dashboard Cards**: Mapped the navigation button to the orders card in the main layout, creating a seamless connection between the dashboard overview and detailed order management interface.

**Improved Accessibility**: Enhanced keyboard navigation and screen reader support throughout the application, ensuring the interface is accessible to all users.

**Performance Optimization**: Implemented efficient state management and component memoization to ensure smooth interactions and fast rendering across all device types.

### Performance Optimizations

**Code Splitting**: Implemented route-based code splitting using React.lazy() and Suspense to reduce initial bundle size. Each major feature loads independently, improving Time to Interactive.

**Lazy Loading**: Components load on-demand using React.lazy() and Suspense, reducing initial JavaScript payload.

**Memoization**: Strategic use of useCallback in context providers to prevent unnecessary re-renders in data-intensive components.

**Bundle Optimization**: Custom Vite configuration with manual chunk splitting for optimal caching and loading performance.

### Responsive Design Strategy

**Mobile-First Approach**: All components designed for mobile devices first, then enhanced for larger screens.

**Breakpoint System**: Consistent breakpoints using Tailwind's responsive utilities:
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

**Grid Layout**: CSS Grid for complex layouts, Flexbox for component alignment and spacing.

## Performance Optimizations

### Bundle Size Optimization
- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Eliminated unused code from dependencies
- **Asset Optimization**: Compressed images and optimized SVGs
- **Vendor Chunking**: Separate vendor bundles for better caching

### Runtime Performance
- **Memoization**: Strategic use of useCallback in contexts to prevent unnecessary re-renders
- **Efficient Filtering**: Optimized search and filter algorithms with real-time filtering
- **Pagination**: Efficient data pagination to limit DOM rendering (10 items per page)
- **Real-time Search**: Immediate search across multiple fields without debouncing

### Loading Performance
- **Lazy Loading**: Components load on-demand using React.lazy() and Suspense
- **Route-based Code Splitting**: Each major feature loads independently
- **Bundle Optimization**: Manual chunk splitting for optimal caching and loading performance

## Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation**: Full keyboard support for all interactive elements
**Screen Reader Support**: Proper ARIA labels and semantic HTML
**Color Contrast**: Meets WCAG AA contrast requirements
**Focus Management**: Visible focus indicators and logical tab order

### Implementation Details

- **Semantic HTML**: Proper use of headings, landmarks, and form elements
- **ARIA Attributes**: Comprehensive labeling for complex components


## Browser Support

### Supported Browsers
- **Chrome**: 90+ (latest 2 versions)
- **Firefox**: 88+ (latest 2 versions)
- **Safari**: 14+ (latest 2 versions)
- **Edge**: 90+ (latest 2 versions)

### Progressive Enhancement
- **Core Functionality**: Basic functionality works with JavaScript disabled
- **Enhanced Experience**: Full features with modern browsers and JavaScript enabled

### Testing Matrix
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad Safari, Android Chrome


---

**Built with ❤️ using React, TypeScript, and modern web technologies**

For questions or support, please open an issue in the repository.
