import { OrderListTableType } from '../types/order-list-table-type';
import { Table } from '../../../../components/table';
import { useTheme } from '../../../contexts/theme-context';
import { orderListColumns } from '../constants/order-list-columns';

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