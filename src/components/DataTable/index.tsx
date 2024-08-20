"use client"

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileIcon } from "lucide-react";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
// }

interface DataTableProps<TData, TValue> {
  columns: any
  data: any,
  rowKey?: string,
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowKey = '_id'
}: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
    //   })    

  return (
    <div className="rounded-md border mb-2">
      <Table>
        <TableHeader>
          {/* {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))} */}
          <TableRow>
                      
            { columns.map((column: any) => (
              <TableHead key={ column.key }>{ column.label }</TableHead>
            )) }
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )} */}
          
          { data?.length > 0 ? data.map((row: any) => (
            <TableRow key={ row?.[rowKey] }>
              { columns.map((column: any) => (
                <TableCell key={ column.accessor }>{ column?.render ? column.render(row[column?.accessor], row) : row[column.accessor] }</TableCell>
              )) }
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={ columns.length } className="h-24 text-center">
                <div className="flex flex-col items-center justify-center p-8">
                  <FileIcon className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No data found</h3>
                  <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
};
