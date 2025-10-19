import { OrderListTableType } from '../types/order-list-table-type';
import { Table } from '../../../../components/table';
import { useTheme } from '../../../contexts/theme-context';
import { orderListColumns } from '../constants/order-list-columns';

/**
 * OrderListTable Component
 * 
 * This component wraps the generic Table component with order-specific configuration
 * and styling. I've implemented custom row className logic to handle selection
 * states with proper visual feedback.
 * 
 * Key features:
 * - Integrates with generic Table component
 * - Custom row selection styling
 * - Theme-aware row hover effects
 * - Column configuration with checkboxes
 * - Efficient row rendering
 * 
 * Design decisions:
 * - Separated table logic from rendering for better maintainability
 * - Row selection state visually distinguished with background color
 * - Hover effects enhance interactivity without being distracting
 * - Proper TypeScript typing for type safety
 */

interface OrderListTableProps {
  data: OrderListTableType[];
  selectedRows: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  allSelected: boolean;
  someSelected: boolean;
}

export const OrderListTable = ({
  data,
  selectedRows,
  onSelectAll,
  onSelectRow,
  allSelected,
  someSelected
}: OrderListTableProps) => {
  const { theme } = useTheme();

  const columns = orderListColumns(theme, selectedRows, onSelectRow, onSelectAll, allSelected, someSelected);


  const getRowClassName = (_row: OrderListTableType, isSelected: boolean, currentTheme: string): string => {
    return isSelected
      ? (currentTheme === 'dark' ? 'bg-white/10' : 'bg-blue-50')
      : (currentTheme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[#F7F9FB]');
  };

  return (
    <Table
      columns={columns}
      data={data}
      getRowClassName={getRowClassName}
      selectedRows={selectedRows}
    />
  );
};