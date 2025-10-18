// src/components/table.tsx
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTheme } from "../modules/contexts/theme-context";

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
    <div className="overflow-x-auto relative sm:rounded-lg">
      <table className="w-full text-sm text-left text-black/40 dark:text-gray-400">
        <thead className={`text-sm ${theme === 'dark' ? ' text-white/80' : 'text-black/40'}`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3">
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
            const isSelected = selectedRows?.includes((row.original as any).id) || false;
            const rowClassName = getRowClassName ? getRowClassName(row.original, isSelected, theme) :
                (isSelected ? (theme === 'dark' ? 'bg-white/10' : 'bg-blue-50') : (theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-50'));

            return (
              <tr key={row.id} className={rowClassName}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-thin ${theme === 'dark' ? 'text-white/80' : 'text-black'}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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