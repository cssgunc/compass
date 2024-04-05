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
import { RowOptionMenu } from "./RowOptionMenu";
import { RowOpenAction } from "./RowOpenAction";
import { TableAction } from "./TableAction";
import { AtSymbolIcon, Bars2Icon } from "@heroicons/react/24/solid";
import TagsInput from "../TagsInput/Index";

const usersExample = usersImport as unknown as User[];

type User = {
  id: number;
  created_at: any;
  username: string;
  role: "administrator" | "employee" | "volunteer";
  email: string;
  program: "domestic" | "economic" | "community";
  experience: number;
  group?: string;
};



export const Table = () => {
  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.display({
      id: "options",
      cell: props => <RowOptionMenu />
    }),
    columnHelper.accessor("username", {
      header: () => <><Bars2Icon className="inline align-top h-4" /> Username</>,
      cell: (info) => <RowOpenAction title={info.getValue()} rowData={info.row.original} />,
    }),
    columnHelper.accessor("role", {
      cell: (info) => <TagsInput presetValue={info.getValue() }presetOptions={["administrator","volunteer","employee"]}  />,
    }),
    columnHelper.accessor("email", {
      header: () => <><AtSymbolIcon className="inline align-top h-4" /> Email</>,
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

  const handleRowData = (row: any) => {
    const rowData: any = {};
    row.cells.forEach((cell: any) => {
      rowData[cell.column.id] = cell.value;
    });
    // Use rowData object containing data from all columns for the current row
    console.log(rowData);
    return rowData;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end">
        <TableAction />
      </div>
      <table className="w-full text-xs text-left rtl:text-right">
        <thead className="text-xs text-gray-500 capitalize">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <th
                  scope="col"
                  className={
                    "p-2 border-gray-200 border-y font-medium "
                    + ((1 < i && i < columns.length - 1) ? "border-x" : "")
                  }
                  key={header.id}
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
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr className="text-gray-800 border-y lowercase hover:bg-gray-50" key={row.id}>
              {row.getVisibleCells().map((cell, i) => (
                <td
                  className={
                    "p-2 "
                    + ((1 < i && i < columns.length - 1) ? "border-x" : "")
                    + ((i === 0) ? "text-center px-0" : "")
                  }
                  key={cell.id}>
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
