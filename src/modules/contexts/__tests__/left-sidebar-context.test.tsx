import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeftSidebarProvider, useLeftSidebar } from '../left-sidebar-context';

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
    const mockMediaQueryList = {
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockReturnValue(mockMediaQueryList),
    });

    return mockMediaQueryList;
};

// Test component to interact with the context
const TestComponent = () => {
    const { isLeftSidebarOpen, toggleLeftSidebar } = useLeftSidebar();

    return (
        <div>
            <span data-testid="sidebar-state">{isLeftSidebarOpen ? 'open' : 'closed'}</span>
            <button data-testid="toggle-sidebar" onClick={toggleLeftSidebar}>
                Toggle Sidebar
            </button>
        </div>
    );
};

// Component to test error handling when used outside provider
const ComponentWithoutProvider = () => {
    try {
        const { isLeftSidebarOpen } = useLeftSidebar();
        return <div>{isLeftSidebarOpen ? 'open' : 'closed'}</div>;
    } catch (error) {
        return <div data-testid="error-message">{(error as Error).message}</div>;
    }
};

describe('LeftSidebarContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('LeftSidebarProvider', () => {
        test('provides default state based on media query (desktop)', () => {
            mockMatchMedia(true); // Desktop size

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
        });

        test('provides default state based on media query (mobile)', () => {
            mockMatchMedia(false); // Mobile size

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed');
        });

        test('toggles sidebar state correctly', () => {
            mockMatchMedia(false); // Start with mobile (closed)

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            const toggleButton = screen.getByTestId('toggle-sidebar');
            const stateDisplay = screen.getByTestId('sidebar-state');

            // Initial state should be closed
            expect(stateDisplay).toHaveTextContent('closed');

            // Click to toggle to open
            act(() => {
                fireEvent.click(toggleButton);
            });
            expect(stateDisplay).toHaveTextContent('open');

            // Click again to toggle back to closed
            act(() => {
                fireEvent.click(toggleButton);
            });
            expect(stateDisplay).toHaveTextContent('closed');
        });

        test('sets up media query listener on mount', () => {
            const mockMediaQueryList = mockMatchMedia(true);

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
            expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        });

        test('cleans up media query listener on unmount', () => {
            const mockMediaQueryList = mockMatchMedia(true);

            const { unmount } = render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            unmount();

            expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        });

        test('responds to media query changes', () => {
            const mockMediaQueryList = mockMatchMedia(false);

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            const stateDisplay = screen.getByTestId('sidebar-state');

            // Initial state should be closed (mobile)
            expect(stateDisplay).toHaveTextContent('closed');

            // Simulate media query change to desktop
            const changeHandler = mockMediaQueryList.addEventListener.mock.calls[0][1];
            act(() => {
                changeHandler({ matches: true } as MediaQueryListEvent);
            });

            expect(stateDisplay).toHaveTextContent('open');

            // Simulate media query change back to mobile
            act(() => {
                changeHandler({ matches: false } as MediaQueryListEvent);
            });

            expect(stateDisplay).toHaveTextContent('closed');
        });
    });

    describe('useLeftSidebar hook', () => {
        test('throws error when used outside LeftSidebarProvider', () => {
            // Suppress console.error for this test since we expect an error
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            render(<ComponentWithoutProvider />);

            expect(screen.getByTestId('error-message')).toHaveTextContent(
                'useLeftSidebar must be used within a LeftSidebarProvider'
            );

            consoleSpy.mockRestore();
        });

        test('provides isLeftSidebarOpen and toggleLeftSidebar', () => {
            mockMatchMedia(true);

            render(
                <LeftSidebarProvider>
                    <TestComponent />
                </LeftSidebarProvider>
            );

            // Should have sidebar state
            expect(screen.getByTestId('sidebar-state')).toBeInTheDocument();

            // Should have toggle button (indicating toggleLeftSidebar function exists)
            expect(screen.getByTestId('toggle-sidebar')).toBeInTheDocument();
        });
    });
});
