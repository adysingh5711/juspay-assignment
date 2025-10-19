import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../theme-context';

// Test component to interact with the theme context
const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <span data-testid="current-theme">{theme}</span>
            <button data-testid="toggle-theme" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
};

// Component to test error handling when used outside provider
const ComponentWithoutProvider = () => {
    try {
        const { theme } = useTheme();
        return <div>{theme}</div>;
    } catch (error) {
        return <div data-testid="error-message">{(error as Error).message}</div>;
    }
};

describe('ThemeContext', () => {
    describe('ThemeProvider', () => {
        test('provides default light theme', () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );

            expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
        });

        test('toggles theme from light to dark', () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );

            const toggleButton = screen.getByTestId('toggle-theme');
            const themeDisplay = screen.getByTestId('current-theme');

            // Initial state should be light
            expect(themeDisplay).toHaveTextContent('light');

            // Click to toggle to dark
            fireEvent.click(toggleButton);
            expect(themeDisplay).toHaveTextContent('dark');

            // Click again to toggle back to light
            fireEvent.click(toggleButton);
            expect(themeDisplay).toHaveTextContent('light');
        });

        test('multiple toggles work correctly', () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );

            const toggleButton = screen.getByTestId('toggle-theme');
            const themeDisplay = screen.getByTestId('current-theme');

            // Start with light
            expect(themeDisplay).toHaveTextContent('light');

            // Toggle multiple times
            fireEvent.click(toggleButton); // light -> dark
            expect(themeDisplay).toHaveTextContent('dark');

            fireEvent.click(toggleButton); // dark -> light
            expect(themeDisplay).toHaveTextContent('light');

            fireEvent.click(toggleButton); // light -> dark
            expect(themeDisplay).toHaveTextContent('dark');
        });
    });

    describe('useTheme hook', () => {
        test('throws error when used outside ThemeProvider', () => {
            // Suppress console.error for this test since we expect an error
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            render(<ComponentWithoutProvider />);

            expect(screen.getByTestId('error-message')).toHaveTextContent(
                'useTheme must be used within a ThemeProvider'
            );

            consoleSpy.mockRestore();
        });

        test('provides theme and toggleTheme function', () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );

            // Should have theme value
            expect(screen.getByTestId('current-theme')).toBeInTheDocument();

            // Should have toggle button (indicating toggleTheme function exists)
            expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
        });
    });
});
