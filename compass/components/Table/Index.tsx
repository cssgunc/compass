// for showcasing to compass

import usersImport from "./users.json";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { RowAction } from "./RowAction";
import { TableAction } from "./TableAction";
import TagsInput from "../TagsInput/Index";

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
};


export const Table = () => {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("username", {
      cell: (info) => <RowAction title={info.getValue()} />,
    }),
    columnHelper.accessor("role", {
      cell: (info) => <TagsInput />,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("program", {
      cell: (info) => info.renderValue(),
    }),
  ];

  const [data, setData] = useState<User[]>([...usersExample]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return(
    <div className="flex flex-col">
    <div className="flex flex-row justify-end">
    <TableAction />
    </div>
    <table className="w-full text-xs text-left rtl:text-right">
          <thead className="text-xs text-gray-500 capitalize">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th scope="col" className="p-3 border-gray-200 border-y font-medium" key={header.id}>
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
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr className="text-gray-800 border-y lowercase hover:bg-gray-50" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="py-2 px-2" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  )
}