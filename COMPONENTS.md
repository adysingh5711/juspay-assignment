# Component Reference Guide

This document provides a quick reference for all documented components in the application.

## Table of Contents

- [Core Application](#core-application)
- [Context Providers](#context-providers)
- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Reusable UI Components](#reusable-ui-components)
- [Dashboard Components](#dashboard-components)
- [Order Management Components](#order-management-components)
- [Data Visualization Components](#data-visualization-components)

---

## Core Application

### App (`src/App.tsx`)
Main application component that initializes routing and analytics.

**Key Features:**
- React Router initialization
- Vercel Analytics integration
- Speed Insights monitoring

**Usage:**
```typescript
import App from './App'
ReactDOM.render(<App />, document.getElementById('root'))
```

---

### Router (`src/router.tsx`)
Centralized routing configuration with lazy loading.

**Routes:**
- `/` → Redirects to `/dashboard/default`
- `/dashboard/default` → Home Dashboard
- `/dashboard/order-list` → Order Management
- `*` → Catch-all redirect to default

**Features:**
- Code splitting at route level
- Suspense boundaries with loading states
- Nested routing for shared layouts

---

## Context Providers

### ThemeContext (`src/modules/contexts/theme-context.tsx`)
Global theme state management (light/dark mode).

**API:**
```typescript
const { theme, toggleTheme } = useTheme()
```

**Values:**
- `theme`: `"light" | "dark"`
- `toggleTheme`: `() => void`

**Features:**
- Memoized toggle function
- Type-safe theme values
- Error handling for context misuse

---

### LeftSidebarContext (`src/modules/contexts/left-sidebar-context.tsx`)
Left sidebar state with responsive auto-open/close.

**API:**
```typescript
const { isLeftSidebarOpen, toggleLeftSidebar } = useLeftSidebar()
```

**Features:**
- Auto-open on desktop (>768px)
- Auto-close on mobile (<768px)
- Media query event listeners
- Proper cleanup on unmount

---

### RightSidebarContext (`src/modules/contexts/right-sidebar-context.tsx`)
Right sidebar state with responsive behavior.

**API:**
```typescript
const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar()
```

**Features:**
- Consistent with left sidebar behavior
- Independent state management
- Responsive auto-management

---

### RightSidebarSectionsContext (`src/modules/contexts/right-sidebar-sections-context.tsx`)
Dynamic section reordering for right sidebar.

**API:**
```typescript
const { 
  sectionOrder, 
  animationKey,
  setNotificationsFirst,
  setActivitiesFirst 
} = useRightSidebarSections()
```

**Features:**
- Dynamic section ordering
- Animation key for re-triggering animations
- Independent priority setters

---

## Layout Components

### LayoutContainer (`src/modules/components/layout-container.tsx`)
Root layout wrapper with context provider hierarchy.

**Provider Hierarchy:**
```
ThemeProvider
  └── LeftSidebarProvider
      └── RightSidebarProvider
          └── RightSidebarSectionsProvider
              └── Layout
```

**Features:**
- Smooth entrance animations
- Proper context nesting
- Route transition animations

---

### Main (`src/modules/main/components/main.tsx`)
Content wrapper for consistent spacing.

**Props:**
```typescript
interface MainProps {
  children: React.ReactNode
}
```

**Usage:**
```typescript
<Main>
  <YourContent />
</Main>
```

---

## Navigation Components

### Navbar (`src/modules/navbar/components/navbar.tsx`)
Top navigation bar with search, theme toggle, and controls.

**Features:**
- Responsive search input
- Theme toggle with icon animation
- Sidebar controls
- Breadcrumb navigation
- Notification bell with attention animation

**Interactions:**
- Search: Expandable on mobile
- Theme: Click to toggle
- Bell: Click for notifications
- Clock: Click for activities

---

### LeftSidebar (`src/modules/left-sidebar/components/left-sidebar.tsx`)
Main navigation sidebar with tabs and menu items.

**Features:**
- User profile display
- Favorites/Recent tabs
- Collapsible menu sections
- Staggered entrance animations
- Responsive width

**Sections:**
- Dashboards
- Pages

---

### RightSidebar (`src/modules/right-sidebar/components/right-sidebar.tsx`)
Activity sidebar with dynamic section ordering.

**Features:**
- Reorderable sections
- Staggered animations
- Layout transitions
- Fixed contacts section

**Sections:**
- Notifications (reorderable)
- Activities (reorderable)
- Contacts (fixed)

---

### Tabs (`src/modules/left-sidebar/components/tabs.tsx`)
Tabbed interface for Favorites and Recently viewed items.

**Features:**
- Two-tab interface
- Active state highlighting
- Theme-aware styling
- Dynamic content rendering

---

### CollapsibleListItem (`src/modules/left-sidebar/components/list-item.tsx`)
Expandable navigation menu item.

**Props:**
```typescript
interface CollapsibleListItemProps {
  list: ListType
}
```

**Features:**
- Collapsible sub-menu
- Active route highlighting
- Hover effects
- Navigation integration
- Smooth animations

---

### SubListItem (`src/modules/left-sidebar/components/list-item.tsx`)
Nested list item for sub-menus.

**Props:**
```typescript
interface SubListItemProps {
  item: { id: string; name: string }
  theme: string
  index: number
}
```

**Features:**
- Staggered entrance
- Hover indicator
- Text truncation

---

## Reusable UI Components

### Sidebar (`src/components/sidebar.tsx`)
Reusable sidebar wrapper with animations.

**Props:**
```typescript
interface SidebarProps {
  direction: "left" | "right"
  isOpen: boolean
  children: React.ReactNode
  width: string
}
```

**Features:**
- Direction-aware animations
- Responsive width
- Theme support
- Overflow handling

---

### Table (`src/components/table.tsx`)
Generic data table built on TanStack Table.

**Props:**
```typescript
interface TableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  getRowClassName?: (row: TData, isSelected: boolean, theme: string) => string
  selectedRows?: string[]
}
```

**Features:**
- Generic type support
- Row selection
- Custom row styling
- Theme-aware
- Hover states

**Usage:**
```typescript
<Table
  columns={columns}
  data={data}
  selectedRows={selectedRows}
  getRowClassName={(row, isSelected, theme) => 
    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
  }
/>
```

---

### SearchInput (`src/components/search-input.tsx`)
Reusable search input with theme support.

**Props:**
```typescript
interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  showIcon?: boolean
  backgroundColor?: string
  borderColor?: string
}
```

**Features:**
- Focus state management
- Theme-aware styling
- Optional keyboard shortcut indicator
- Customizable colors

---

### Separator (`src/components/separator.tsx`)
Horizontal or vertical divider.

**Props:**
```typescript
interface SeparatorProps {
  direction: "horizontal" | "vertical"
  color: string
  length: string
}
```

**Usage:**
```typescript
<Separator direction="horizontal" color="bg-gray-200" length="w-full" />
<Separator direction="vertical" color="bg-gray-300" length="h-full" />
```

---

## Dashboard Components

### Home (`src/modules/main/home/components/home.tsx`)
Main dashboard view with data visualization widgets.

**Layout:**
- Row 1: Overall details + Projections chart (1:1)
- Row 2: Revenue graph + Location map (3:1)
- Row 3: Products table + Sales pie chart (3:1)

**Features:**
- Responsive grid layout
- Theme-aware styling
- Modular widget structure

---

### OverallDetails (`src/modules/main/home/overall-details/components/overall-details.tsx`)
KPI cards grid with adaptive layout.

**Features:**
- Adaptive grid columns
- Monitors sidebar states
- Responsive breakpoints
- Smooth layout transitions

**Layout Logic:**
- Both sidebars open: 1 col (mobile) → 2 cols (desktop)
- One/both closed: 2 cols (mobile) → 2 cols (desktop)

---

### DetailCard (`src/modules/main/home/overall-details/components/detail-card.tsx`)
Individual KPI metric card.

**Props:**
```typescript
interface DetailCardProps {
  detail: DetailsType
}
```

**Features:**
- Theme-aware colors
- Trend indicators
- Hover effects
- Entrance animations
- Navigation (Orders card)
- Keyboard accessibility

---

### DataContainer (`src/modules/main/home/components/data-container.tsx`)
Reusable wrapper for chart widgets.

**Props:**
```typescript
interface DataContainerProps {
  headingChild: React.ReactNode
  graphChild: React.ReactNode
  legendChild?: React.ReactNode
  justifyCenter?: boolean
}
```

**Features:**
- Consistent styling
- Entrance animations
- Hover effects
- Optional legend
- Staggered child animations

---

### RevenueGraph (`src/modules/main/home/revenue-graph/components/revenue-graph.tsx`)
Revenue trend line chart.

**Features:**
- Solid/dashed line distinction (actual vs projected)
- Custom tooltip
- Theme-aware
- Responsive sizing
- Custom legend with totals

---

### ProjectionsVsActualsGraph (`src/modules/main/home/projections-vs-actuals-graph/components/projections-vs-actual-graph.tsx`)
Projection comparison bar chart.

**Features:**
- Dual overlapping bars
- Theme-aware colors
- Custom tooltip
- Rounded corners
- Entrance animations

---

## Order Management Components

### OrderList (`src/modules/main/order-list/components/order-list.tsx`)
Main order management component.

**Features:**
- Real-time search
- Multi-criteria filtering
- Column sorting
- Pagination
- Row selection
- Responsive design

**State Management:**
```typescript
const [searchTerm, setSearchTerm] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [selectedRows, setSelectedRows] = useState<string[]>([])
const [sortField, setSortField] = useState<SortField>('id')
const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
const [filters, setFilters] = useState<FilterState>({
  status: 'all',
  date: 'all'
})
```

---

### OrderListHeader (`src/modules/main/order-list/components/order-list-header.tsx`)
Toolbar with search and filters.

**Features:**
- Real-time search
- Filter dropdown
- Sort toggle
- Active filter indicator
- Clear filters
- Click-outside to close

---

### OrderListTable (`src/modules/main/order-list/components/order-list-table.tsx`)
Data table wrapper for orders.

**Features:**
- Integrates generic Table
- Custom row styling
- Selection state management
- Theme-aware

---

### OrderListPagination (`src/modules/main/order-list/components/order-list-pagination.tsx`)
Smart pagination control.

**Features:**
- Window-based page display (max 5)
- Dynamic page window
- Responsive design
- Disabled states
- Active page highlighting

**Pagination Logic:**
- Total ≤ 5: Show all
- Current ≤ 3: Show 1-5
- Current ≥ total-2: Show last 5
- Otherwise: Show current ± 2

---

## Data Visualization Components

### GraphCartesianGrid (`src/components/graph/cartesian-grid.tsx`)
Reusable chart grid component.

**Features:**
- Horizontal lines only
- Theme-aware colors
- Subtle dashed lines
- Consistent styling

---

### GraphXAxis (`src/components/graph/x-axis.tsx`)
Standardized X-axis component.

**Props:**
```typescript
interface GraphXAxisProps {
  dataKeyName: string
}
```

**Features:**
- No tick lines
- Theme-aware colors
- Consistent spacing
- Small font size (12px)

---

### GraphYAxis (`src/components/graph/y-axis.tsx`)
Y-axis with custom formatting.

**Features:**
- Million-dollar notation (10M)
- Fixed tick values [0, 10M, 20M, 30M]
- No axis/tick lines
- Theme-aware
- Proper positioning

**Formatter:**
```typescript
tickFormatter={(value) => 
  `${value === 0 ? '0' : value / 1000000 + 'M'}`
}
```

---

## Component Guidelines

### Creating New Components

1. **Documentation**: Add JSDoc comments with purpose, features, and props
2. **TypeScript**: Define proper interfaces for all props
3. **Theme Support**: Use `useTheme()` for theme-aware styling
4. **Accessibility**: Add ARIA labels and keyboard support
5. **Performance**: Use memoization where appropriate
6. **Testing**: Write tests for complex logic

### Component Structure

```typescript
/**
 * Component Name
 * 
 * Description of what the component does.
 * 
 * Key features:
 * - Feature 1
 * - Feature 2
 * 
 * @param prop1 - Description
 * @param prop2 - Description
 */
export const ComponentName = ({ prop1, prop2 }: Props) => {
  // State and hooks
  const { theme } = useTheme()
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  }
  
  // Render
  return (
    <div className={`base-classes ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Content */}
    </div>
  )
}
```

---

**Document Version**: 1.0.0  
**Last Updated**: October 2025  
**For detailed technical documentation, see** [DOCUMENTATION.md](./DOCUMENTATION.md)

