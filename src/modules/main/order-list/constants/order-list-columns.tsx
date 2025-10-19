import { ColumnDef } from "@tanstack/react-table";
import { OrderListTableType } from "../types/order-list-table-type";
import { OrderStatusBadge } from "../components/order-status-badge";
import { CalendarBlank, ClipboardText, DotsThree } from "phosphor-react";
import { useState } from "react";

// Clipboard utility function
const copyToClipboard = async (text: string, setShowToast: (show: boolean) => void) => {
  try {
    await navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

export const orderListColumns = (
  theme: string,
  selectedRows: string[],
  onSelectRow: (id: string, checked: boolean) => void,
  onSelectAll?: (checked: boolean) => void,
  allSelected?: boolean,
  someSelected?: boolean
): ColumnDef<OrderListTableType>[] => [
    {
      id: 'select',
      header: ({ }) => (
        <input
          title="Orders List"
          type="checkbox"
          checked={allSelected}
          ref={(input) => {
            if (input) input.indeterminate = Boolean(someSelected && !allSelected);
          }}
          onChange={(e) => onSelectAll?.(e.target.checked)}
          className="h-4 w-4 text-white border-gray-300 rounded focus:ring-black focus:ring-offset-0 [&:checked]:bg-black [&:checked]:border-black [&:checked]:text-white dark:bg-black dark:border-black dark:[&:checked]:bg-[#C6C7F8] dark:[&:checked]:border-[#C6C7F8]"
          style={{ accentColor: theme === 'dark' ? '#C6C7F8' : 'black' }}
        />
      ),
      cell: ({ row }) => (
        <input
          title="Orders List"
          type="checkbox"
          checked={selectedRows.includes(row.original.id)}
          onChange={(e) => onSelectRow(row.original.id, e.target.checked)}
          className="h-4 w-4 text-white border-gray-300 rounded focus:ring-black focus:ring-offset-0 [&:checked]:bg-black [&:checked]:border-black [&:checked]:text-white dark:bg-black dark:border-black dark:[&:checked]:bg-[#C6C7F8] dark:[&:checked]:border-[#C6C7F8]"
          style={{ accentColor: theme === 'dark' ? '#C6C7F8' : 'black' }}
        />
      ),
    },
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showToast, setShowToast] = useState(false);

        return (
          <div className="relative">
            <div
              className="group flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
                #{row.original.id}
              </span>
              <ClipboardText
                size={16}
                className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                  } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(row.original.id, setShowToast);
                }}
              />
            </div>
            {showToast && (
              <div className="top-8 absolute left-0 z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                Text copied to clipboard
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'username',
      header: 'User',
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showToast, setShowToast] = useState(false);

        return (
          <div className="relative">
            <div
              className="group flex items-center cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 w-8 h-8 overflow-hidden rounded-full">
                  <img
                    src={row.original.avatar}
                    alt={`${row.original.username} avatar`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                        <div class="h-full w-full bg-blue-500 flex items-center justify-center">
                          <span class="text-sm font-medium text-white">
                            ${row.original.username.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)}
                          </span>
                        </div>
                      `;
                      }
                    }}
                  />
                </div>
                <div className="ml-4">
                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
                    {row.original.username}
                  </div>
                </div>
              </div>
              <ClipboardText
                size={16}
                className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                  } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(row.original.username, setShowToast);
                }}
              />
            </div>
            {showToast && (
              <div className="top-8 absolute left-0 z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                Text copied to clipboard
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'projectName',
      header: 'Project',
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showToast, setShowToast] = useState(false);

        return (
          <div className="relative">
            <div
              className="group flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
                {row.original.projectName}
              </span>
              <ClipboardText
                size={16}
                className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                  } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(row.original.projectName, setShowToast);
                }}
              />
            </div>
            {showToast && (
              <div className="top-8 absolute left-0 z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                Text copied to clipboard
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showToast, setShowToast] = useState(false);

        return (
          <div className="relative">
            <div
              className="group flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
                {row.original.address}
              </span>
              <ClipboardText
                size={16}
                className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                  } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(row.original.address, setShowToast);
                }}
              />
            </div>
            {showToast && (
              <div className="top-8 absolute left-0 z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                Text copied to clipboard
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false);
        const [showToast, setShowToast] = useState(false);

        return (
          <div className="relative">
            <div
              className="group flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center flex-1 gap-1 text-sm font-medium">
                <CalendarBlank size={16} />
                <span className={`${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
                  {row.original.date}
                </span>
              </div>
              <ClipboardText
                size={16}
                className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
                  } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(row.original.date, setShowToast);
                }}
              />
            </div>
            {showToast && (
              <div className="top-8 absolute left-0 z-50 px-2 py-1 text-xs text-white bg-black rounded shadow-lg">
                Text copied to clipboard
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: '',
      cell: (context: any) => {
        return (
          <div className="flex items-center justify-center cursor-pointer">
            <DotsThree
              size={32}
              className={`transition-opacity duration-200 ${context.isRowHovered ? 'opacity-100' : 'opacity-0'
                } ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'}`}
            />
          </div>
        );
      },
    },
  ];