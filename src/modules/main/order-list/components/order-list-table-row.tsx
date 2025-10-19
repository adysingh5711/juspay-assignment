import { OrderListTableType } from '../types/order-list-table-type';
import { OrderStatusBadge } from '../components/order-status-badge';
import { CalendarBlank } from 'phosphor-react';
import { useTheme } from '../../../contexts/theme-context';

interface OrderListTableRowProps {
  order: OrderListTableType;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export const OrderListTableRow = ({
  order,
  isSelected,
  onSelect
}: OrderListTableRowProps) => {
  const { theme } = useTheme()
  return (
    <tr className={isSelected ? theme === 'dark' ? 'bg-white/10' : 'bg-blue-50' : theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-50'}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <input
            title="Orders List"
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="h-4 w-4 text-white border-gray-300 rounded checked:bg-black checked:border-black focus:ring-black focus:ring-offset-0 [&:checked]:bg-black [&:checked]:border-black [&:checked]:text-white dark:bg-black dark:border-black dark:[&:checked]:bg-[#C6C7F8] dark:[&:checked]:border-[#C6C7F8]"
            style={{
              accentColor: theme === 'dark' ? '#C6C7F8' : 'black'
            }}
          />
        </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
        #{order.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
            <img
              src={order.avatar}
              alt={`${order.username} avatar`}
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
                        ${order.username.split(' ').map((word: string) => word.charAt(0)).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <div className="ml-4">
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>{order.username}</div>
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>
        {order.projectName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm ${theme === 'dark' ? 'text-white/90' : 'text-neutral-800'}`}>{order.address}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm gap-1">
          <CalendarBlank size={16} />
          {order.date}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderStatusBadge status={order.status} />
      </td>
    </tr>
  );
}; 