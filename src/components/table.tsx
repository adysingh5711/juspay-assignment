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
        <thead className={`text-sm ${theme === 'dark' ? ' text-white/80' : 'text-black/40'}`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3 font-normal">
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
        <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-gray-200'}`}>
          {table.getRowModel().rows.map((row) => {
            const [isRowHovered, setIsRowHovered] = useState(false);
            const isSelected = selectedRows?.includes((row.original as any).id) || false;
            const rowClassName = getRowClassName ? getRowClassName(row.original, isSelected, theme) :
              (isSelected ? (theme === 'dark' ? 'bg-white/10' : 'bg-blue-50') : (theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[#F7F9FB]'));

            return (
              <tr
                key={row.id}
                className={rowClassName}
                onMouseEnter={() => setIsRowHovered(true)}
                onMouseLeave={() => setIsRowHovered(false)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-thin ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}
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