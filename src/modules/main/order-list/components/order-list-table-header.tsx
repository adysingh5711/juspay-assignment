import { useTheme } from '../../../contexts/theme-context';

interface OrderListTableHeaderProps {
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

export const OrderListTableHeader = ({
  allSelected,
  someSelected,
  onSelectAll
}: OrderListTableHeaderProps) => {
  const { theme } = useTheme();
  return (
    <thead>
      <tr>
        <th scope="col" className="px-6 py-3 text-left">
          <div className="flex items-center cursor-pointer">
            <input
              title="Orders List"
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected && !allSelected;
              }}
              onChange={(e) => onSelectAll(e.target.checked)}
              className={`h-4 w-4 text-white border-gray-300 rounded focus:ring-black focus:ring-offset-0 checked:bg-black checked:border-black checked:text-white ${theme === "dark" && "bg-black border-gray-600 cursor-pointer"} `}
              style={{
                accentColor: theme === 'dark' ? '#C6C7F8' : 'black'
              }}
            />
          </div>
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          Order ID
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          User
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          Project
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          Address
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          Date
        </th>
        <th scope="col" className="text-neutral-400 px-6 py-3 text-sm font-medium tracking-wider text-left">
          Status
        </th>
      </tr>
    </thead>
  );
}; 