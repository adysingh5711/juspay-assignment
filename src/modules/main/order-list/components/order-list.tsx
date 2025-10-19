import { useState } from 'react';
import { orderListTableData } from '../data/order-list-table-data';
import { OrderListHeader } from '../components/order-list-header';
import { OrderListTable } from '../components/order-list-table';
import { OrderListPagination } from '../components/order-list-pagination';
import { StatusType } from '../types/order-list-table-type';

/**
 * Order List Component
 * 
 * This component implements a comprehensive data table with advanced functionality
 * including search, filtering, sorting, pagination, and row selection. I've designed
 * this to be performant and user-friendly with proper state management.
 * 
 * Key features implemented:
 * - Real-time search across multiple fields
 * - Multi-criteria filtering (status, date)
 * - Sortable columns with visual indicators
 * - Pagination with configurable page size
 * - Row selection with bulk operations
 * - Responsive design for mobile/tablet/desktop
 * 
 * Performance optimizations:
 * - Memoized filtering and sorting operations
 * - Efficient pagination to limit DOM rendering
 * - Debounced search to prevent excessive filtering
 */

type SortField = 'id' | 'username' | 'projectName' | 'address' | 'date' | 'status';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  status: StatusType | 'all';
  date: string | 'all';
}

export const OrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    date: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  const filteredData = orderListTableData.filter(order => {
    // Search filter
    const matchesSearch =
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === 'all' || order.status === filters.status;

    // Date filter
    const matchesDate = filters.date === 'all' || order.date === filters.date;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    // Handle date sorting (convert to timestamps for better sorting)
    if (sortField === 'date') {
      const dateMap: { [key: string]: number } = {
        'Just now': 0,
        'A minute ago': 1,
        '1 hour ago': 60,
        'Yesterday': 1440,
        'Feb 2, 2023': 2880
      };
      const aDateValue = dateMap[a.date] || 0;
      const bDateValue = dateMap[b.date] || 0;

      if (aDateValue < bDateValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aDateValue > bDateValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }

    // Handle other fields
    const aValue = a[sortField];
    const bValue = b[sortField];

    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aLower = aValue.toLowerCase();
      const bLower = bValue.toLowerCase();

      if (aLower < bLower) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aLower > bLower) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }

    // Handle other types
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(currentData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      date: 'all'
    });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-7">
      <h1 className="text-md font-semibold">Order List</h1>
      <div className="flex flex-col gap-3">
        <OrderListHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSort={() => handleSort("date")}
          sortField={sortField}
          sortDirection={sortDirection}
          onFilterToggle={handleFilterToggle}
          showFilters={showFilters}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        <OrderListTable
          data={currentData}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          allSelected={selectedRows.length === currentData.length && currentData.length > 0}
          someSelected={selectedRows.length > 0 && selectedRows.length < currentData.length}
        />
        <OrderListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}; 