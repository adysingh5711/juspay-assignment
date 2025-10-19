import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../sidebar';
import { ThemeProvider } from '../../modules/contexts/theme-context';

// Mock framer-motion to avoid animation complexity in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

const renderSidebarWithTheme = (props: any) => {
    return render(
        <ThemeProvider>
            <Sidebar {...props} />
        </ThemeProvider>
    );
};

describe('Sidebar Component', () => {
    const defaultProps = {
        direction: 'left',
        isOpen: true,
        width: 'w-64',
        children: <div data-testid="sidebar-content">Test Content</div>
    };

    test('renders without crashing', () => {
        renderSidebarWithTheme(defaultProps);
        expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    });

    test('shows content when isOpen is true', () => {
        renderSidebarWithTheme(defaultProps);
        expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    });

    test('hides content when isOpen is false', () => {
        renderSidebarWithTheme({
            ...defaultProps,
            isOpen: false
        });
        expect(screen.queryByTestId('sidebar-content')).not.toBeInTheDocument();
    });

    test('applies correct width when open', () => {
        const { container } = renderSidebarWithTheme(defaultProps);
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('w-64');
    });

    test('applies w-0 width when closed', () => {
        const { container } = renderSidebarWithTheme({
            ...defaultProps,
            isOpen: false
        });
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('w-0');
    });

    test('applies left border for right direction', () => {
        const { container } = renderSidebarWithTheme({
            ...defaultProps,
            direction: 'right'
        });
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('border-l');
    });

    test('applies right border for left direction', () => {
        const { container } = renderSidebarWithTheme({
            ...defaultProps,
            direction: 'left'
        });
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('border-r');
    });

    test('applies light theme styles by default', () => {
        const { container } = renderSidebarWithTheme(defaultProps);
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('bg-white', 'border-black/10', 'text-black');
    });

    test('renders children correctly', () => {
        const testContent = <div data-testid="custom-content">Custom Content</div>;
        renderSidebarWithTheme({
            ...defaultProps,
            children: testContent
        });
        expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    test('applies transition classes for smooth animations', () => {
        const { container } = renderSidebarWithTheme(defaultProps);
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('transition-all', 'duration-500');
    });

    test('has proper responsive classes', () => {
        const { container } = renderSidebarWithTheme(defaultProps);
        const sidebarElement = container.firstChild as HTMLElement;
        expect(sidebarElement).toHaveClass('relative', 'min-h-screen');
    });
});
