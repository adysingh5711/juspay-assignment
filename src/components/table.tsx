// src/components/table.tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTheme } from "../modules/contexts/theme-context";
import { useState } from "react";

interface TableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  getRowClassName?: (row: TData, isSelected: boolean, theme: string) => string;
  selectedRows?: string[];
}

export function Table<TData>({ columns, data, getRowClassName, selectedRows }: TableProps<TData>) {
  const { theme } = useTheme();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="sm:rounded-lg relative overflow-x-auto">
      <table className="text-black/40 dark:text-gray-400 w-full text-sm text-left">
        <thead className="text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className={`px-6 py-3 font-normal border-b ${theme === 'dark' ? 'border-white/10 text-white/80' : "text-black/40 border-b-black/20"}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&>tr:hover+tr]:border-t-0">
          {table.getRowModel().rows.map((row, rowIndex) => {
            const [isRowHovered, setIsRowHovered] = useState(false);
            const isSelected = selectedRows?.includes((row.original as any).id) || false;
            const rowClassName = getRowClassName ? getRowClassName(row.original, isSelected, theme) :
              (isSelected ? (theme === 'dark' ? 'bg-white/10' : 'bg-blue-50') : (theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[#F7F9FB]'));

            return (
              <tr
                key={row.id}
                className={`${rowClassName} border-t ${rowIndex === 0 ? 'border-t-0' : ''} ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} hover:border-t-0`}
                onMouseEnter={() => setIsRowHovered(true)}
                onMouseLeave={() => setIsRowHovered(false)}
              >
                {row.getVisibleCells().map((cell, index, array) => (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-thin ${theme === 'dark' ? 'text-white/80' : 'text-black'}
                    ${index === 0 ? 'rounded-l-lg' : ''} 
                    ${index === array.length - 1 ? 'rounded-r-lg' : ''}`}
                  >
                    {flexRender(cell.column.columnDef.cell, { ...cell.getContext(), isRowHovered })}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}