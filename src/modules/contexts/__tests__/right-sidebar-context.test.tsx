import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RightSidebarProvider, useRightSidebar } from '../right-sidebar-context';

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
    const { isRightSidebarOpen, toggleRightSidebar } = useRightSidebar();

    return (
        <div>
            <span data-testid="sidebar-state">{isRightSidebarOpen ? 'open' : 'closed'}</span>
            <button data-testid="toggle-sidebar" onClick={toggleRightSidebar}>
                Toggle Sidebar
            </button>
        </div>
    );
};

// Component to test error handling when used outside provider
const ComponentWithoutProvider = () => {
    try {
        const { isRightSidebarOpen } = useRightSidebar();
        return <div>{isRightSidebarOpen ? 'open' : 'closed'}</div>;
    } catch (error) {
        return <div data-testid="error-message">{(error as Error).message}</div>;
    }
};

describe('RightSidebarContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('RightSidebarProvider', () => {
        test('provides default state based on media query (desktop)', () => {
            mockMatchMedia(true); // Desktop size

            render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
            );

            expect(screen.getByTestId('sidebar-state')).toHaveTextContent('open');
        });

        test('provides default state based on media query (mobile)', () => {
            mockMatchMedia(false); // Mobile size

            render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
            );

            expect(screen.getByTestId('sidebar-state')).toHaveTextContent('closed');
        });

        test('toggles sidebar state correctly', () => {
            mockMatchMedia(false); // Start with mobile (closed)

            render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
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
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
            );

            expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
            expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        });

        test('cleans up media query listener on unmount', () => {
            const mockMediaQueryList = mockMatchMedia(true);

            const { unmount } = render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
            );

            unmount();

            expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        });

        test('responds to media query changes', () => {
            const mockMediaQueryList = mockMatchMedia(false);

            render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
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

    describe('useRightSidebar hook', () => {
        test('throws error when used outside RightSidebarProvider', () => {
            // Suppress console.error for this test since we expect an error
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            render(<ComponentWithoutProvider />);

            expect(screen.getByTestId('error-message')).toHaveTextContent(
                'useLeftSidebar must be used within a LeftSidebarProvider'
            );

            consoleSpy.mockRestore();
        });

        test('provides isRightSidebarOpen and toggleRightSidebar', () => {
            mockMatchMedia(true);

            render(
                <RightSidebarProvider>
                    <TestComponent />
                </RightSidebarProvider>
            );

            // Should have sidebar state
            expect(screen.getByTestId('sidebar-state')).toBeInTheDocument();

            // Should have toggle button (indicating toggleRightSidebar function exists)
            expect(screen.getByTestId('toggle-sidebar')).toBeInTheDocument();
        });
    });
});
