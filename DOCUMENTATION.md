# Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Documentation](#component-documentation)
3. [State Management](#state-management)
4. [Styling System](#styling-system)
5. [Animation System](#animation-system)
6. [Data Flow](#data-flow)
7. [Performance Optimization](#performance-optimization)
8. [Testing Strategy](#testing-strategy)
9. [Best Practices](#best-practices)

---

## Architecture Overview

### Design Pattern

This application follows a **Feature-Based Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│          Application Layer              │
│  (App.tsx, Router, Layout Container)    │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌────────▼────────┐
│  Context Layer │   │  Component Layer │
│  (State Mgmt)  │   │  (UI & Logic)    │
└───────┬────────┘   └────────┬─────────┘
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │    Data Layer       │
        │  (Types, Constants) │
        └─────────────────────┘
```

### Technology Stack Rationale

#### React 19.1.0
- **Why**: Latest concurrent features, improved performance, automatic batching
- **Benefits**: Better developer experience, concurrent rendering capabilities
- **Trade-offs**: Newer API may require learning curve for some patterns

#### TypeScript 4.9.5
- **Why**: Type safety, better IDE support, reduced runtime errors
- **Benefits**: Catch errors at compile time, excellent IntelliSense
- **Trade-offs**: Slightly slower build times, initial setup complexity

#### Tailwind CSS 4.1.14
- **Why**: Utility-first approach, rapid development, small production bundle
- **Benefits**: No CSS naming conflicts, responsive design utilities, JIT compilation
- **Trade-offs**: HTML can appear verbose, learning curve for utility classes

#### Framer Motion 12.23.6
- **Why**: Production-ready animations, excellent performance, declarative API
- **Benefits**: Hardware-accelerated animations, gesture support, layout animations
- **Trade-offs**: ~50KB bundle size (acceptable for the features gained)

---

## Component Documentation

### Core Components

#### App Component
**Location**: `src/App.tsx`
**Purpose**: Application root that initializes routing and analytics

```typescript
/**
 * Responsibilities:
 * - Initialize React Router
 * - Mount Vercel analytics
 * - Provide global error boundaries
 */
```

**Key Features**:
- Clean separation of routing logic
- Analytics integration for performance monitoring
- Single source of truth for app initialization

---

#### Router Configuration
**Location**: `src/router.tsx`
**Purpose**: Centralized routing with lazy loading

```typescript
/**
 * Routing Strategy:
 * - Lazy loading for code splitting
 * - Nested routes for shared layouts
 * - Default redirects for UX
 */
```

**Route Structure**:
```
/                           → Redirect to /dashboard/default
├── /dashboard/default      → Home Dashboard
├── /dashboard/order-list   → Order Management
└── *                       → Catch-all redirect
```

**Performance Optimization**:
- React.lazy() for route components
- Suspense with loading fallback
- Chunk splitting at route level

---

### Layout Components

#### LayoutContainer
**Location**: `src/modules/components/layout-container.tsx`
**Purpose**: Root layout orchestrator with context providers

```typescript
/**
 * Provider Hierarchy:
 * ThemeProvider
 *   └── LeftSidebarProvider
 *       └── RightSidebarProvider
 *           └── RightSidebarSectionsProvider
 *               └── Layout Components
 */
```

**Design Decisions**:
- Theme provider at root for global theme access
- Sidebar providers nested for isolated state
- Layout animations for smooth transitions
- Context hierarchy ensures proper state isolation

**Animation Strategy**:
```typescript
// Initial page load
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}

// Content area
initial={{ y: 20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.4, delay: 0.1 }}
```

---

#### Navbar Component
**Location**: `src/modules/navbar/components/navbar.tsx`
**Purpose**: Top navigation with search, theme, and controls

**Key Features**:
1. **Responsive Search**
   - Hidden on mobile, expandable on click
   - Auto-hide when sidebars open
   - Persistent state management

2. **Theme Toggle**
   - Smooth icon transition
   - Persistent theme preference
   - System preference detection

3. **Sidebar Controls**
   - Synchronized state management
   - Visual feedback on active state
   - Hover effects with scale animations

**State Management**:
```typescript
// Search visibility logic
useEffect(() => {
  if (isLeftSidebarOpen || isRightSidebarOpen) {
    setSearchInputVisible(false)
  } else {
    setSearchInputVisible(true)
  }
}, [isLeftSidebarOpen, isRightSidebarOpen])
```

**Animation Details**:
- Bell icon: Attention-grabbing ring animation on mount
- Icons: Scale on hover (1.1x) and tap (0.95x)
- Search: Smooth expand/collapse with fade

---

### Context Providers

#### Theme Context
**Location**: `src/modules/contexts/theme-context.tsx`
**Purpose**: Global theme state management

**Implementation**:
```typescript
type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
```

**Key Features**:
- Memoized toggle function (useCallback)
- Type-safe theme values
- Error handling for context usage
- Simple boolean toggle for performance

**Performance Optimization**:
```typescript
// Prevents re-renders of all consumers
const toggleTheme = useCallback(() => {
  setTheme(prev => prev === "light" ? "dark" : "light")
}, [])
```

---

#### Sidebar Contexts
**Location**: `src/modules/contexts/*-sidebar-context.tsx`
**Purpose**: Manage sidebar visibility with responsive behavior

**Responsive Logic**:
```typescript
useEffect(() => {
  const mediaQuery = window.matchMedia('(min-width: 768px)')
  
  const handleResize = (e: MediaQueryListEvent) => {
    setSidebarOpen(e.matches)
  }
  
  // Set initial state
  setSidebarOpen(mediaQuery.matches)
  
  // Listen for changes
  mediaQuery.addEventListener('change', handleResize)
  
  // Cleanup
  return () => mediaQuery.removeEventListener('change', handleResize)
}, [])
```

**Design Rationale**:
- Automatic open on desktop (>768px)
- Automatic close on mobile (<768px)
- User toggle overrides auto behavior
- Proper cleanup prevents memory leaks

---

### Reusable Components

#### Table Component
**Location**: `src/components/table.tsx`
**Purpose**: Generic data table with TanStack Table

**Why TanStack Table**:
- Type-safe column definitions
- Built-in memoization
- Headless UI for flexibility
- Excellent TypeScript support
- Powerful sorting/filtering capabilities

**Generic Implementation**:
```typescript
export function Table<TData>({
  columns: ColumnDef<TData>[],
  data: TData[],
  getRowClassName?: (row: TData, isSelected: boolean, theme: string) => string,
  selectedRows?: string[]
}: TableProps<TData>)
```

**Performance Features**:
- Row-level hover state (prevents global re-renders)
- Memoized row rendering
- Efficient key management
- Conditional styling without re-renders

---

#### SearchInput Component
**Location**: `src/components/search-input.tsx`
**Purpose**: Reusable search with theme support

**Key Features**:
```typescript
interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  showIcon?: boolean
  backgroundColor?: string
  borderColor?: string
}
```

**Focus State Management**:
- Visual feedback with border color
- Smooth transitions (300ms)
- Theme-aware placeholder colors
- Optional keyboard shortcut indicator

**Accessibility**:
- Proper placeholder text
- Focus indicators
- Keyboard navigation
- Screen reader friendly

---

## State Management

### Context API Architecture

#### Why Context API over Redux

**Pros**:
- Built into React (no additional dependencies)
- Excellent for moderate state complexity
- Better TypeScript integration
- Smaller bundle size (~0KB vs ~30KB for Redux)
- Simpler mental model for this use case

**Cons**:
- No time-travel debugging
- No middleware ecosystem
- Potential for unnecessary re-renders if not careful

**Mitigation Strategy**:
```typescript
// Split contexts by domain
ThemeContext          → Theme only
LeftSidebarContext    → Left sidebar state
RightSidebarContext   → Right sidebar state
SectionsContext       → Section ordering

// Memoize callbacks
const toggleTheme = useCallback(() => {
  setTheme(prev => prev === "light" ? "dark" : "light")
}, [])
```

---

### State Organization

#### Context Hierarchy
```
<ThemeProvider>                      ← Global theme
  <LeftSidebarProvider>              ← Left sidebar state
    <RightSidebarProvider>           ← Right sidebar state
      <SectionsProvider>             ← Section ordering
        <Application />              ← Components
      </SectionsProvider>
    </RightSidebarProvider>
  </LeftSidebarProvider>
</ThemeProvider>
```

#### State Scope Guidelines

1. **Global State** (Theme)
   - Affects entire application
   - Changed infrequently
   - Root level context

2. **Layout State** (Sidebars)
   - Affects specific layout sections
   - Changed moderately
   - Mid-level contexts

3. **Local State** (Forms, UI)
   - Component-specific
   - Changed frequently
   - useState in component

---

## Styling System

### Tailwind Configuration

**Custom Breakpoints**:
```javascript
// tailwind.config.js
screens: {
  'custom-md': '768px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
}
```

**Design Tokens**:
```javascript
colors: {
  primary: '#A8C5DA',
  accent: '#C6C7F8',
  // Theme-specific colors handled via opacity
}
```

### Theme System

**Light Mode**:
- Background: `bg-white`
- Text: `text-black`
- Borders: `border-black/10`
- Hover: `hover:bg-black/5`

**Dark Mode**:
- Background: `bg-black/90`
- Text: `text-white`
- Borders: `border-white/10`
- Hover: `hover:bg-white/10`

**Implementation Pattern**:
```typescript
className={`
  base-classes 
  ${theme === 'dark' ? 'dark-classes' : 'light-classes'}
`}
```

---

## Animation System

### Framer Motion Patterns

#### Entrance Animations
```typescript
// Standard fade + slide
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
```

#### Hover Effects
```typescript
// Subtle interactions
whileHover={{ 
  scale: 1.1,
  transition: { duration: 0.2 }
}}
whileTap={{ scale: 0.95 }}
```

#### Staggered Animations
```typescript
// Create visual hierarchy
{items.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      duration: 0.3, 
      delay: index * 0.1  // Stagger delay
    }}
  />
))}
```

#### Layout Animations
```typescript
// Smooth reordering
<AnimatePresence mode="wait">
  <motion.div
    key={uniqueKey}
    layout  // Automatic layout animations
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimatePresence>
```

### Animation Performance

**Best Practices**:
1. Animate `transform` and `opacity` (GPU-accelerated)
2. Avoid animating `width`, `height`, `top`, `left`
3. Use `layout` prop for complex animations
4. Keep durations < 500ms for snappy feel
5. Use `will-change` sparingly

**Performance Monitoring**:
```typescript
// Check for jank
transition={{ 
  duration: 0.3,
  ease: "easeInOut"  // Smoother than default
}}
```

---

## Data Flow

### Order List Data Flow

```
User Input (Search/Filter/Sort)
        ↓
   State Update
        ↓
  Filter Pipeline
        ↓
   Sort Pipeline
        ↓
  Pagination Slice
        ↓
   Render Rows
```

**Implementation**:
```typescript
// 1. Filter
const filteredData = data.filter(order => 
  matchesSearch && matchesStatus && matchesDate
)

// 2. Sort
const sortedData = [...filteredData].sort((a, b) => {
  // Sorting logic
})

// 3. Paginate
const currentData = sortedData.slice(startIndex, endIndex)

// 4. Render
<Table data={currentData} />
```

**Performance Consideration**:
- Filtering happens on every keystroke
- Sorting only on column header click
- Pagination recalculates when data changes
- Table only renders current page (10 items)

---

## Performance Optimization

### Bundle Splitting

**Route-Based Splitting**:
```typescript
const Home = lazy(() => 
  import('./modules/main/home/components/home')
    .then(module => ({ default: module.Home }))
)
```

**Benefits**:
- Reduced initial bundle size
- Faster Time to Interactive (TTI)
- Better caching strategy

**Vite Configuration**:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'graph': ['recharts'],
        'animation': ['framer-motion'],
      }
    }
  }
}
```

### Memoization Strategy

**Context Callbacks**:
```typescript
const toggleTheme = useCallback(() => {
  setTheme(prev => prev === "light" ? "dark" : "light")
}, [])  // No dependencies = never recreated
```

**Why This Matters**:
- Prevents re-renders of all context consumers
- Especially important for frequently accessed contexts
- Theme toggle used in 20+ components

### Render Optimization

**Table Rows**:
```typescript
// Local hover state prevents global re-renders
const [isRowHovered, setIsRowHovered] = useState(false)
```

**List Items**:
```typescript
// Key prop ensures stable identity
{items.map(item => (
  <ListItem key={item.id} {...item} />
))}
```

---

## Testing Strategy

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage for utilities and helpers
- **Component Tests**: All reusable components
- **Integration Tests**: Critical user flows
- **E2E Tests**: Main user journeys

### Testing Tools

**Vitest**: Fast unit testing
```typescript
describe('ThemeContext', () => {
  it('toggles theme correctly', () => {
    // Test implementation
  })
})
```

**React Testing Library**: Component testing
```typescript
test('renders search input', () => {
  render(<SearchInput value="" onChange={jest.fn()} />)
  expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
})
```

---

## Best Practices

### Component Design

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Build complex UIs from simple parts
3. **Props Interface**: Clear, documented interfaces for all props
4. **Default Props**: Sensible defaults for optional props

### TypeScript Usage

1. **Strict Mode**: Enabled for maximum type safety
2. **Explicit Types**: Avoid `any`, use specific types
3. **Interface over Type**: For object shapes (better error messages)
4. **Generic Components**: Use generics for reusable components

### Performance

1. **Lazy Loading**: Use for routes and heavy components
2. **Memoization**: Callbacks in contexts, expensive computations
3. **Pagination**: Limit rendered items to necessary subset
4. **Bundle Analysis**: Regular checks with `npm run build`

### Accessibility

1. **Semantic HTML**: Proper use of headings, landmarks
2. **ARIA Labels**: For complex interactive elements
3. **Keyboard Navigation**: All features accessible via keyboard
4. **Focus Management**: Visible, logical focus indicators

---

## Future Improvements

### Potential Enhancements

1. **State Management**:
   - Consider Zustand for more complex state needs
   - Implement Redux DevTools for debugging

2. **Performance**:
   - Implement virtual scrolling for large lists
   - Add service worker for offline support
   - Optimize image loading with blur-up technique

3. **Testing**:
   - Add E2E tests with Playwright
   - Implement visual regression testing
   - Add performance benchmarks

4. **Features**:
   - Add data export functionality
   - Implement real-time updates via WebSockets
   - Add user preferences persistence
   - Multi-language support (i18n)

---

**Document Version**: 1.0.0  
**Last Updated**: October 2025  
**Maintained By**: Development Team

