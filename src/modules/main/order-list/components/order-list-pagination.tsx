import { useTheme } from '../../../contexts/theme-context';

/**
 * OrderListPagination Component
 * 
 * This component provides an intelligent pagination control with responsive
 * behavior and smart page number display. I've implemented a window-based
 * pagination approach that shows a maximum of 5 page numbers at a time.
 * 
 * Key features:
 * - Responsive design (simplified on mobile, full on desktop)
 * - Smart page number display (shows 5 pages max)
 * - Dynamic page window based on current page
 * - Previous/Next button with disabled states
 * - Active page highlighting
 * - Theme-aware styling
 * - Accessible button states
 * 
 * Pagination Logic:
 * - If total pages ≤ 5: show all pages
 * - If current page ≤ 3: show pages 1-5
 * - If current page ≥ totalPages - 2: show last 5 pages
 * - Otherwise: show current page ± 2 pages
 * 
 * This approach ensures users always see relevant page numbers without
 * overwhelming the UI with too many buttons.
 */

interface OrderListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const OrderListPagination = ({
  currentPage,
  totalPages,
  onPageChange
}: OrderListPaginationProps) => {
  const { theme } = useTheme()
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
      <div className="sm:hidden flex justify-between flex-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md"
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
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-end hidden">
        <div>
          <nav className="relative z-0 inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${theme === 'dark' ? ' text-white/90' : ' text-gray-500 hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-1 w-7 justify-center text-sm font-medium ${page === currentPage
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}; 