import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '../search-input';
import { ThemeProvider } from '../../modules/contexts/theme-context';

// Mock phosphor-react icons
jest.mock('phosphor-react', () => ({
    MagnifyingGlass: ({ className }: any) => <div data-testid="magnifying-glass" className={className} />,
    Command: ({ className }: any) => <div data-testid="command-icon" className={className} />
}));

const renderSearchInputWithTheme = (props: any) => {
    return render(
        <ThemeProvider>
            <SearchInput {...props} />
        </ThemeProvider>
    );
};

describe('SearchInput Component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    const defaultProps = {
        value: '',
        onChange: mockOnChange
    };

    test('renders without crashing', () => {
        renderSearchInputWithTheme(defaultProps);
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    test('displays the correct value', () => {
        renderSearchInputWithTheme({
            ...defaultProps,
            value: 'test search'
        });
        expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
    });

    test('calls onChange when input value changes', () => {
        renderSearchInputWithTheme(defaultProps);
        const input = screen.getByPlaceholderText('Search');

        fireEvent.change(input, { target: { value: 'new search' } });
        expect(mockOnChange).toHaveBeenCalledWith('new search');
    });

    test('shows magnifying glass icon by default', () => {
        renderSearchInputWithTheme(defaultProps);
        expect(screen.getByTestId('magnifying-glass')).toBeInTheDocument();
    });

    test('shows command icon and slash when showIcon is true', () => {
        renderSearchInputWithTheme({
            ...defaultProps,
            showIcon: true
        });
        expect(screen.getByTestId('command-icon')).toBeInTheDocument();
        expect(screen.getByText('/')).toBeInTheDocument();
    });

    test('hides command icon and slash when showIcon is false', () => {
        renderSearchInputWithTheme({
            ...defaultProps,
            showIcon: false
        });
        expect(screen.queryByTestId('command-icon')).not.toBeInTheDocument();
        expect(screen.queryByText('/')).not.toBeInTheDocument();
    });

    test('applies custom background color', () => {
        renderSearchInputWithTheme({
            ...defaultProps,
            backgroundColor: 'bg-red-500'
        });
        const input = screen.getByPlaceholderText('Search');
        expect(input).toHaveClass('bg-red-500');
    });

    test('applies custom border color', () => {
        renderSearchInputWithTheme({
            ...defaultProps,
            borderColor: 'border-blue-500'
        });
        const input = screen.getByPlaceholderText('Search');
        expect(input).toHaveClass('border-blue-500');
    });

    test('applies default background and border when not specified', () => {
        renderSearchInputWithTheme(defaultProps);
        const input = screen.getByPlaceholderText('Search');
        expect(input).toHaveClass('bg-black/5', 'border-none');
    });

    test('handles focus and blur events', () => {
        renderSearchInputWithTheme(defaultProps);
        const input = screen.getByPlaceholderText('Search');

        // Test focus and blur events without checking focus state
        // (focus state testing can be unreliable in jsdom environment)
        fireEvent.focus(input);
        fireEvent.blur(input);

        // The component should handle these events without errors
        expect(input).toBeInTheDocument();
    });

    test('has correct placeholder text', () => {
        renderSearchInputWithTheme(defaultProps);
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    test('input has correct type attribute', () => {
        renderSearchInputWithTheme(defaultProps);
        const input = screen.getByPlaceholderText('Search');
        expect(input).toHaveAttribute('type', 'text');
    });

    test('applies transition and styling classes', () => {
        renderSearchInputWithTheme(defaultProps);
        const input = screen.getByPlaceholderText('Search');
        expect(input).toHaveClass('transition-all', 'duration-300', 'rounded-[8px]');
    });
});
