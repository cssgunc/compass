"use client";
// import Table from "@/components/Table";
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import usersImport from "./users.json";

const usersExample = usersImport as unknown as User[];

type User = {
  id: number;
  created_at: any;
  username: string;
  role: "ADMIN" | "EMPLOYEE" | "VOLUNTEER";
  email: string;
  program: "DOMESTIC" | "ECONOMIC" | "COMMUNITY";
  experience: number;
  group?: string;
}

// TODO: Example data. Remove later.

export default function Page() {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("username", {
      cell: info => info.getValue(),
    }),
    columnHelper.accessor("role", {
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("email", {
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("program", {
      cell: info => info.renderValue(),
    })
  ];

  const [data, setData] = useState<User[]>([...usersExample]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1>This is example data!!</h1>

      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>);

}
