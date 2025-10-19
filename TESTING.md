# Testing Documentation

## Overview

This document provides comprehensive information about the Jest-based unit testing suite for the SaaS Dashboard application. The test suite follows best practices for React component testing and ensures code quality and reliability.

## Test Setup

### Configuration

The project uses Jest as the primary testing framework with the following configuration:

- **Jest Config**: `jest.config.js`
- **Babel Config**: `babel.config.js` 
- **Setup File**: `src/setupTests.js`

### Dependencies

Key testing dependencies installed:

```json
{
  "jest": "^29.x.x",
  "@types/jest": "^30.0.0",
  "ts-jest": "^29.x.x",
  "babel-jest": "^29.x.x",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^13.5.0",
  "@babel/preset-env": "^7.x.x",
  "@babel/preset-react": "^7.x.x",
  "@babel/preset-typescript": "^7.x.x"
}
```

## Test Structure

### Test Organization

Tests are organized following a co-located pattern:

```
src/
├── components/
│   ├── __tests__/
│   │   ├── sidebar.test.tsx
│   │   ├── search-input.test.tsx
│   │   └── table.test.tsx
├── modules/
│   ├── contexts/
│   │   └── __tests__/
│   │       ├── theme-context.test.tsx
│   │       ├── left-sidebar-context.test.tsx
│   │       └── right-sidebar-context.test.tsx
│   └── left-sidebar/
│       ├── components/
│       │   └── __tests__/
│       │       └── list-item.test.tsx
│       └── data/
│           └── __tests__/
│               ├── user-data.test.ts
│               └── dashboards-list.test.ts
└── main/
    └── home/
        └── overall-details/
            └── data/
                └── __tests__/
                    └── overall-details-data.test.ts
```

## Test Categories

### 1. Component Tests

#### Sidebar Component (`src/components/__tests__/sidebar.test.tsx`)
- **Purpose**: Tests the reusable sidebar component
- **Coverage**: 
  - Rendering with different props
  - Theme integration
  - Open/close states
  - Direction-based styling
  - Animation handling

#### SearchInput Component (`src/components/__tests__/search-input.test.tsx`)
- **Purpose**: Tests the search input component
- **Coverage**:
  - Value handling and onChange events
  - Theme-aware styling
  - Icon visibility controls
  - Focus/blur event handling
  - Custom styling props

#### Table Component (`src/components/__tests__/table.test.tsx`)
- **Purpose**: Tests the generic table component built on TanStack Table
- **Coverage**:
  - Data rendering
  - Column configuration
  - Row selection
  - Theme integration
  - Responsive behavior
  - Custom row styling

#### List Item Component (`src/modules/left-sidebar/components/__tests__/list-item.test.tsx`)
- **Purpose**: Tests collapsible navigation list items
- **Coverage**:
  - Collapsible behavior
  - Navigation integration
  - Theme-aware styling
  - Hover states
  - Sub-item rendering

### 2. Context Tests

#### Theme Context (`src/modules/contexts/__tests__/theme-context.test.tsx`)
- **Purpose**: Tests global theme management
- **Coverage**:
  - Default theme state
  - Theme toggling functionality
  - Error handling for usage outside provider
  - Context value provision

#### Sidebar Contexts
- **Left Sidebar** (`src/modules/contexts/__tests__/left-sidebar-context.test.tsx`)
- **Right Sidebar** (`src/modules/contexts/__tests__/right-sidebar-context.test.tsx`)
- **Purpose**: Tests responsive sidebar state management
- **Coverage**:
  - Media query integration
  - Responsive behavior
  - Toggle functionality
  - Event listener cleanup
  - Error handling

### 3. Data/Utility Tests

#### User Data (`src/modules/left-sidebar/data/__tests__/user-data.test.ts`)
- **Purpose**: Tests user configuration data
- **Coverage**:
  - Data structure validation
  - Property types
  - Non-empty values

#### Dashboards List (`src/modules/left-sidebar/data/__tests__/dashboards-list.test.ts`)
- **Purpose**: Tests navigation menu data
- **Coverage**:
  - Array structure
  - Required properties
  - Unique IDs
  - Sub-list validation
  - Icon component validation

#### Overall Details Data (`src/modules/main/home/overall-details/data/__tests__/overall-details-data.test.ts`)
- **Purpose**: Tests dashboard metrics data
- **Coverage**:
  - Data structure validation
  - Type checking
  - Unique constraints
  - Color class validation
  - Change type validation

## Testing Patterns

### 1. Component Testing Pattern

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentName } from '../component-name';
import { ThemeProvider } from '../../contexts/theme-context';

const renderWithTheme = (props: any) => {
  return render(
    <ThemeProvider>
      <ComponentName {...props} />
    </ThemeProvider>
  );
};

describe('ComponentName', () => {
  test('renders without crashing', () => {
    renderWithTheme(defaultProps);
    expect(screen.getByTestId('component')).toBeInTheDocument();
  });
});
```

### 2. Context Testing Pattern

```typescript
const TestComponent = () => {
  const { state, action } = useContext();
  return (
    <div>
      <span data-testid="state">{state}</span>
      <button data-testid="action" onClick={action}>Action</button>
    </div>
  );
};

describe('Context', () => {
  test('provides expected values', () => {
    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );
    expect(screen.getByTestId('state')).toBeInTheDocument();
  });
});
```

### 3. Data Testing Pattern

```typescript
describe('DataModule', () => {
  test('has correct structure', () => {
    expect(DataModule).toHaveProperty('requiredProperty');
    expect(typeof DataModule.property).toBe('expectedType');
  });
});
```

## Mocking Strategies

### 1. External Libraries

```typescript
// Mock framer-motion for animation testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

// Mock phosphor-react icons
jest.mock('phosphor-react', () => ({
  IconName: ({ className }: any) => <div data-testid="icon" className={className} />
}));
```

### 2. Router Integration

```typescript
// Mock React Router for navigation testing
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' })
}));
```

### 3. Media Queries

```typescript
// Mock window.matchMedia for responsive testing
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockReturnValue({
      matches,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  });
};
```

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Results

Current test suite statistics:
- **Test Suites**: 10 passed
- **Tests**: 105 passed
- **Coverage**: Comprehensive coverage of core components and utilities

## Best Practices Implemented

### 1. Test Organization
- Co-located tests with source code
- Descriptive test names
- Grouped related tests in describe blocks

### 2. Mocking Strategy
- Mock external dependencies appropriately
- Avoid over-mocking internal components
- Use realistic mock data

### 3. Assertions
- Use specific, meaningful assertions
- Test behavior, not implementation details
- Include both positive and negative test cases

### 4. Setup and Cleanup
- Proper test isolation
- Clean up side effects
- Reset mocks between tests

### 5. Accessibility
- Include accessibility-focused tests
- Use semantic queries when possible
- Test keyboard navigation where applicable

## Continuous Integration

The test suite is designed to run in CI/CD environments with:
- Fast execution times
- Reliable, non-flaky tests
- Clear error reporting
- Coverage reporting integration

## Future Enhancements

Potential areas for test suite expansion:
1. **Integration Tests**: Add tests for component interactions
2. **E2E Tests**: Implement Cypress or Playwright tests
3. **Performance Tests**: Add performance regression testing
4. **Visual Regression**: Implement screenshot testing
5. **API Mocking**: Add MSW for API interaction testing

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure proper module mapping in Jest config
2. **Animation Tests**: Mock framer-motion appropriately
3. **Theme Tests**: Always wrap components with ThemeProvider
4. **Router Tests**: Mock router hooks for navigation testing

### Debug Tips

- Use `screen.debug()` to inspect rendered output
- Add `--verbose` flag for detailed test output
- Use `--detectOpenHandles` to find memory leaks
- Enable `--coverage` to identify untested code paths

This testing documentation ensures maintainable, reliable tests that support the application's quality and development workflow.
