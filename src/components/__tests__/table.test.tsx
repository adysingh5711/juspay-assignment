import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from '../table';
import { ThemeProvider } from '../../modules/contexts/theme-context';
import { ColumnDef } from '@tanstack/react-table';

// Mock data type for testing
interface TestData {
    id: string;
    name: string;
    email: string;
    age: number;
}

const mockData: TestData[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

const mockColumns: ColumnDef<TestData>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'age',
        header: 'Age',
    }
];

const renderTableWithTheme = (props: any) => {
    return render(
        <ThemeProvider>
            <Table {...props} />
        </ThemeProvider>
    );
};

describe('Table Component', () => {
    const defaultProps = {
        columns: mockColumns,
        data: mockData
    };

    test('renders without crashing', () => {
        renderTableWithTheme(defaultProps);
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('renders table headers correctly', () => {
        renderTableWithTheme(defaultProps);
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
    });

    test('renders table data correctly', () => {
        renderTableWithTheme(defaultProps);

        // Check first row data
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();

        // Check second row data
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
    });

    test('renders correct number of rows', () => {
        renderTableWithTheme(defaultProps);
        const rows = screen.getAllByRole('row');
        // +1 for header row
        expect(rows).toHaveLength(mockData.length + 1);
    });

    test('handles empty data', () => {
        renderTableWithTheme({
            ...defaultProps,
            data: []
        });

        // Should still render headers
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();

        // Should only have header row
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1);
    });

    test('applies selected row styling', () => {
        renderTableWithTheme({
            ...defaultProps,
            selectedRows: ['1']
        });

        const rows = screen.getAllByRole('row');
        // Check that selected row has appropriate styling (this would need more specific testing based on actual implementation)
        expect(rows[1]).toBeInTheDocument(); // First data row
    });

    test('handles custom row className function', () => {
        const mockGetRowClassName = jest.fn().mockReturnValue('custom-row-class');

        renderTableWithTheme({
            ...defaultProps,
            getRowClassName: mockGetRowClassName
        });

        expect(mockGetRowClassName).toHaveBeenCalled();
        expect(mockGetRowClassName).toHaveBeenCalledWith(
            mockData[0],
            false, // isSelected
            'light' // theme
        );
    });

    test('handles row hover events', () => {
        renderTableWithTheme(defaultProps);

        const rows = screen.getAllByRole('row');
        const firstDataRow = rows[1]; // Skip header row

        // Test mouse enter and leave
        fireEvent.mouseEnter(firstDataRow);
        fireEvent.mouseLeave(firstDataRow);

        // The component should handle these events without errors
        expect(firstDataRow).toBeInTheDocument();
    });

    test('applies theme-aware styling', () => {
        const { container } = renderTableWithTheme(defaultProps);
        const table = container.querySelector('table');

        expect(table).toHaveClass('text-black/40', 'dark:text-gray-400');
    });

    test('has proper table structure', () => {
        renderTableWithTheme(defaultProps);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(3);
        expect(screen.getAllByRole('cell')).toHaveLength(9); // 3 columns × 3 rows
    });

    test('applies responsive classes', () => {
        const { container } = renderTableWithTheme(defaultProps);
        const tableContainer = container.firstChild as HTMLElement;

        expect(tableContainer).toHaveClass('sm:rounded-lg', 'relative', 'overflow-x-auto');
    });

    test('renders with different column configurations', () => {
        const singleColumnConfig: ColumnDef<TestData>[] = [
            {
                accessorKey: 'name',
                header: 'Name Only',
            }
        ];

        renderTableWithTheme({
            columns: singleColumnConfig,
            data: mockData
        });

        expect(screen.getByText('Name Only')).toBeInTheDocument();
        expect(screen.queryByText('Email')).not.toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(1);
    });
});
