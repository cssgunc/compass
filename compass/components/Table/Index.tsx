// for showcasing to compass

import usersImport from "./users.json";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { RowOptionMenu } from "./RowOptionMenu";
import { RowOpenAction } from "./RowOpenAction";
import { TableAction } from "./TableAction";
import { Bars2Icon, AtSymbolIcon, HashtagIcon, ArrowDownCircleIcon } from "@heroicons/react/24/solid";

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
  visible: boolean;
};


export const Table = () => {
  const columnHelper = createColumnHelper<User>();

  useEffect(() => {
    const sortedUsers = [...usersExample].sort((a, b) => (a.visible === b.visible ? 0 : a.visible ? -1 : 1));
    setData(sortedUsers);
  }, []);

  const deleteUser = (userId) => {
    console.log(data);
    setData(currentData => currentData.filter(user => user.id !== userId));
  };

  const hideUser = (userId: number) => {
    console.log(`Hiding user with ID: ${userId}`); // Confirm the ID being processed
    setData(currentData => {
      const newData = currentData.map(user => {
        console.log(`Checking user with ID: ${user.id}`); // Confirm each user's ID being checked
        return user.id === userId ? { ...user, visible: false } : user;
      }).sort((a, b) => a.visible === b.visible ? 0 : a.visible ? -1 : 1);
  
      console.log(newData); // Check the sorted data
      return newData;
    });
  };
  const columns = [
    columnHelper.display({
      id: "options",
      cell: props => <RowOptionMenu onDelete={() => deleteUser(props.row.original.id)} onHide={() => hideUser(props.row.original.id)} />
    }),
    columnHelper.accessor("username", {
      header: () => <><Bars2Icon className="inline align-top h-4 mr-2" /> Username</>,
      cell: (info) => <RowOpenAction title={info.getValue()} />,
    }),
    columnHelper.accessor("role", {
      header: () => <><ArrowDownCircleIcon className="inline align-top h-4" /> Role</>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("email", {
      header: () => <><AtSymbolIcon className="inline align-top h-4" /> Email</>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("program", {
      header: () => <><ArrowDownCircleIcon className="inline align-top h-4" /> Program</>,
      cell: (info) => info.renderValue(),
    }),
  ];

  const [data, setData] = useState<User[]>([...usersExample]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

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
                    + ((i === 0) ? "text-left px-0" : "")
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
