import { ColumnDef } from "@tanstack/react-table";
import { OrderListTableType } from "../types/order-list-table-type";
import { OrderStatusBadge } from "../components/order-status-badge";
import { CalendarBlank } from "phosphor-react";

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
          className="h-4 w-4 text-white border-gray-300 rounded checked:bg-black checked:border-black focus:ring-black focus:ring-offset-0 [&:checked]:bg-black [&:checked]:border-black [&:checked]:text-white dark:bg-black dark:border-black dark:[&:checked]:bg-[#C6C7F8] dark:[&:checked]:border-[#C6C7F8]"
          style={{ accentColor: theme === 'dark' ? '#C6C7F8' : 'black' }}
        />
      ),
      cell: ({ row }) => (
        <input
          title="Orders List"
          type="checkbox"
          checked={selectedRows.includes(row.original.id)}
          onChange={(e) => onSelectRow(row.original.id, e.target.checked)}
          className="h-4 w-4 text-white border-gray-300 rounded checked:bg-black checked:border-black focus:ring-black focus:ring-offset-0 [&:checked]:bg-black [&:checked]:border-black [&:checked]:text-white dark:bg-black dark:border-black dark:[&:checked]:bg-[#C6C7F8] dark:[&:checked]:border-[#C6C7F8]"
          style={{ accentColor: theme === 'dark' ? '#C6C7F8' : 'black' }}
        />
      ),
    },
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => (
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
          #{row.original.id}
        </span>
      ),
    },
    {
      accessorKey: 'username',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
            <img
              src={row.original.avatar}
              alt={`${row.original.username} avatar`}
              className="h-full w-full object-cover"
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
      ),
    },
    {
      accessorKey: 'projectName',
      header: 'Project',
      cell: ({ row }) => (
        <span className={`text-sm ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
          {row.original.projectName}
        </span>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
        <span className={`text-sm ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
          {row.original.address}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => (
        <div className="flex items-center text-sm gap-1">
          <CalendarBlank size={16} />
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
    },
  ];