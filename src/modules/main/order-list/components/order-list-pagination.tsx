import React from 'react';
import { useTheme } from '../../../contexts/theme-context';

interface OrderListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const OrderListPagination: React.FC<OrderListPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const {theme} = useTheme()
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className={` px-4 py-3 flex items-center justify-between sm:px-6`}>
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${theme === 'dark' ? 'text-white/90 ' : 'text-gray-700  hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
        <div>
          <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${theme === 'dark' ? ' text-white/90' : ' text-gray-500 hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-1 w-7 justify-center text-sm font-medium ${
                  page === currentPage
                    ? `z-10 ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-neutral-100 text-black'} rounded-[8px]`
                    : `${theme === 'dark' ? ' text-white/80' : ' text-gray-500 hover:bg-gray-50'}`
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${theme === 'dark' ? 'text-white/90' : ' text-gray-500 hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}; 