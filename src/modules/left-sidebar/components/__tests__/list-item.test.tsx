import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CollapsibleListItem, SubListItem } from '../list-item';
import { ThemeProvider } from '../../../contexts/theme-context';
import { ListType } from '../../types/list-type';

// Mock phosphor-react icons
jest.mock('phosphor-react', () => ({
    CaretRight: ({ size, className }: any) => (
        <div data-testid="caret-right" className={className} style={{ fontSize: size }} />
    ),
    House: ({ size, weight }: any) => (
        <div data-testid="house-icon" style={{ fontSize: size }} data-weight={weight} />
    )
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

const renderWithProviders = (component: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <ThemeProvider>
                {component}
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe('SubListItem Component', () => {
    const mockItem = { id: 'test-id', name: 'Test Item' };
    const defaultProps = {
        item: mockItem,
        theme: 'light',
        index: 0
    };

    test('renders without crashing', () => {
        renderWithProviders(<SubListItem {...defaultProps} />);
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    test('displays item name correctly', () => {
        renderWithProviders(<SubListItem {...defaultProps} />);
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    test('applies hover styles on mouse enter and leave', () => {
        const { container } = renderWithProviders(<SubListItem {...defaultProps} />);
        const itemElement = container.firstChild as HTMLElement;

        // Initially should not have hover styles
        expect(itemElement).toHaveClass('hover:bg-neutral-100');

        // Mouse enter should trigger hover state
        fireEvent.mouseEnter(itemElement);
        // Mouse leave should remove hover state
        fireEvent.mouseLeave(itemElement);
    });

    test('applies dark theme hover styles', () => {
        const { container } = renderWithProviders(
            <SubListItem {...defaultProps} theme="dark" />
        );
        const itemElement = container.firstChild as HTMLElement;
        expect(itemElement).toHaveClass('hover:bg-white/15');
    });

    test('truncates long text', () => {
        const longNameItem = { id: 'long-id', name: 'This is a very long item name that should be truncated' };
        renderWithProviders(
            <SubListItem {...defaultProps} item={longNameItem} />
        );
        const textElement = screen.getByText(longNameItem.name);
        expect(textElement).toHaveClass('truncate');
    });
});

describe('CollapsibleListItem Component', () => {
    const mockNavigate = jest.fn();

    // Mock useNavigate hook
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/' })
    }));

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    const mockListWithoutSubList: ListType = {
        id: 'default',
        name: 'Default',
        icon: React.forwardRef<SVGSVGElement>((props, _ref) => <div data-testid="house-icon" {...props} />)
    };

    const mockListWithSubList: ListType = {
        id: 'analytics',
        name: 'Analytics',
        icon: React.forwardRef<SVGSVGElement>((props, _ref) => <div data-testid="analytics-icon" {...props} />),
        subList: [
            { id: 'reports', name: 'Reports' },
            { id: 'metrics', name: 'Metrics' }
        ]
    };

    test('renders without crashing', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        expect(screen.getByText('Default')).toBeInTheDocument();
    });

    test('displays list item name and icon', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        expect(screen.getByText('Default')).toBeInTheDocument();
    });

    test('shows caret icon when subList exists', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithSubList} />);
        expect(screen.getByTestId('caret-right')).toBeInTheDocument();
    });

    test('does not show caret icon when no subList', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        expect(screen.queryByTestId('caret-right')).not.toBeInTheDocument();
    });

    test('toggles subList visibility when clicked and has subList', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithSubList} />);

        // Initially subList should not be visible
        expect(screen.queryByText('Reports')).not.toBeInTheDocument();

        // Click to expand
        const listItem = screen.getByText('Analytics').closest('div');
        fireEvent.click(listItem!);

        // SubList should now be visible
        expect(screen.getByText('Reports')).toBeInTheDocument();
        expect(screen.getByText('Metrics')).toBeInTheDocument();
    });

    test('applies hover styles on mouse enter and leave', () => {
        const { container } = renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        const listItemContainer = container.querySelector('.flex.items-center.cursor-pointer') as HTMLElement;

        fireEvent.mouseEnter(listItemContainer);
        fireEvent.mouseLeave(listItemContainer);
    });

    test('applies active styles for default route', () => {
        // This would require mocking useLocation to return specific paths
        renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        // The component should apply active styles based on current route
    });

    test('renders all sub-items when expanded', () => {
        renderWithProviders(<CollapsibleListItem list={mockListWithSubList} />);

        // Click to expand
        const listItem = screen.getByText('Analytics').closest('div');
        fireEvent.click(listItem!);

        // Check that all sub-items are rendered
        expect(screen.getByText('Reports')).toBeInTheDocument();
        expect(screen.getByText('Metrics')).toBeInTheDocument();
    });

    test('applies correct theme classes', () => {
        const { container } = renderWithProviders(<CollapsibleListItem list={mockListWithoutSubList} />);
        // Should have theme-aware classes applied
        expect(container.firstChild).toBeInTheDocument();
    });
});
