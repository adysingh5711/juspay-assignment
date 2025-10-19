import { useState, useEffect, useRef } from 'react';
import { SearchInput } from '../../../../components/search-input';
import { ArrowsDownUp, FunnelSimple, Plus, CaretDown } from 'phosphor-react';
import { useTheme } from '../../../contexts/theme-context';
import { StatusType } from '../types/order-list-table-type';

type SortField = 'id' | 'username' | 'projectName' | 'address' | 'date' | 'status';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  status: StatusType | 'all';
  date: string | 'all';
}

interface OrderListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onFilterToggle: () => void;
  showFilters: boolean;
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

// Custom Select Component
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className = ''
}: CustomSelectProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg border transition-colors ${theme === 'dark'
          ? 'bg-black border-gray-600 text-white hover:border-gray-500'
          : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-[#black/40]`}
      >
        <span className={selectedOption ? '' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown
          size={12}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-lg shadow-lg border ${theme === 'dark'
          ? 'bg-black border-gray-600'
          : 'bg-white border-gray-200'
          }`}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${option.value === value
                  ? theme === 'dark'
                    ? 'bg-white/10 text-white'
                    : 'bg-black/5 text-black'
                  : theme === 'dark'
                    ? 'text-white hover:bg-white/10'
                    : 'text-black hover:bg-black/5'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const OrderListHeader = ({
  searchTerm,
  onSearchChange,
  onSort,
  sortField,
  sortDirection,
  onFilterToggle,
  showFilters,
  filters,
  onFilterChange,
  onClearFilters
}: OrderListHeaderProps) => {
  const { theme } = useTheme()
  const filterRef = useRef<HTMLDivElement>(null);

  // Check if any filters are active
  const hasActiveFilters = filters.status !== 'all' || filters.date !== 'all';

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        onFilterToggle();
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters, onFilterToggle]);

  const handleSortClick = () => {
    // Cycle through sort fields: id -> username -> projectName -> address -> date -> status -> id
    const sortFields: SortField[] = ['id', 'username', 'projectName', 'address', 'date', 'status'];
    const currentIndex = sortFields.indexOf(sortField);
    const nextField = sortFields[(currentIndex + 1) % sortFields.length];
    onSort(nextField);
  };

  const statusOptions: { value: StatusType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Status' },
    { value: 'complete', label: 'Complete' },
    { value: 'pending', label: 'Pending' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const dateOptions: { value: string | 'all'; label: string }[] = [
    { value: 'all', label: 'All Dates' },
    { value: 'Just now', label: 'Just now' },
    { value: 'A minute ago', label: 'A minute ago' },
    { value: '1 hour ago', label: '1 hour ago' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'Feb 2, 2023', label: 'Feb 2, 2023' }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-[#F7F9FB] text-black'} rounded-[8px] p-2 gap-4`}>
      <div className="sm:flex-row sm:items-center sm:gap-0 flex flex-col items-start justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <div className='p-1'>
            <Plus size={16} className='cursor-pointer font-semibold hover:text-[#A8C5DA]' />
          </div>
          <div className='relative p-1' ref={filterRef}>
            <FunnelSimple
              size={16}
              className={`cursor-pointer hover:text-[#A8C5DA] ${showFilters || hasActiveFilters ? 'text-[#A8C5DA]' : ''}`}
              onClick={onFilterToggle}
            />
            {/* Active filter indicator */}
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#A8C5DA] rounded-full"></div>
            )}
            {/* Filter Dropdown */}
            {showFilters && (
              <div className={`absolute top-full left-0 mt-2 z-50 min-w-64 rounded-lg shadow-xl border ${theme === 'dark' ? 'bg-black border-neutral-600' : 'bg-white border-gray-200'}`}>
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Filters
                    </h3>
                    <button
                      onClick={onClearFilters}
                      className={`text-xs px-3 py-1.5 rounded-md transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-black' : 'text-gray-500 hover:text-[#black/40] hover:bg-[#black/40]/10'}`}
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2.5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Status
                    </label>
                    <CustomSelect
                      value={filters.status}
                      onChange={(value) => onFilterChange('status', value)}
                      options={statusOptions}
                      placeholder="All Status"
                    />
                  </div>

                  {/* Date Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2.5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Date
                    </label>
                    <CustomSelect
                      value={filters.date}
                      onChange={(value) => onFilterChange('date', value)}
                      options={dateOptions}
                      placeholder="All Dates"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='p-1'>
            <ArrowsDownUp
              size={16}
              className={`cursor-pointer hover:text-[#A8C5DA] ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
              onClick={handleSortClick}
            />
          </div>
        </div>
        <div className="sm:w-auto relative w-full">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            showIcon={false}
            backgroundColor={theme === 'dark' ? 'bg-black/10' : 'bg-white'}
            borderColor={theme === 'dark' ? 'border border-white/10' : 'border border-neutral-300'}
          />
        </div>
      </div>
    </div>
  );
}; 