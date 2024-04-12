// for showcasing to compass

import usersImport from "./users.json";
import {
  Cell,
  ColumnDef,
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useState, useEffect, FunctionComponent } from "react";
import { RowOptionMenu } from "./RowOptionMenu";
import { RowOpenAction } from "./RowOpenAction";
import { TableAction } from "./TableAction";
import { Bars2Icon, AtSymbolIcon, HashtagIcon, ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { rankItem } from "@tanstack/match-sorter-utils";

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

// For search
const fuzzyFilter = (row: Row<any>, columnId: string, value: any, addMeta: (meta: any) => void) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
}

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
    console.log(`Toggling visibility for user with ID: ${userId}`);
    setData(currentData => {
      const newData = currentData.map(user => {
        if (user.id === userId) {
          return { ...user, visible: !user.visible };
        }
        return user;
      }).sort((a, b) => a.visible === b.visible ? 0 : a.visible ? -1 : 1);

      console.log(newData);
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

  // Searching
  const [query, setQuery] = useState("");
  const handleSearchChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setQuery(String(target.value));
  }

  // TODO: Filtering
  // TODO: Sorting

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter: query,
    },
    onGlobalFilterChange: setQuery,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end">
        <TableAction query={query} handleChange={handleSearchChange} />
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
        <tbody>
          {table.getRowModel().rows.map((row) => {
            // Individual row
            const isUserVisible = row.original.visible;
            const rowClassNames = `text-gray-800 border-y lowercase hover:bg-gray-50 ${!isUserVisible ? "bg-gray-200 text-gray-500" : ""}`;
            return (
              <tr
                className={rowClassNames}
                key={row.id}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell key={cell.id} cell={cell} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

type TableCellProps = {
  cell: Cell<any, any>;
  //i: number;
}

const TableCell: FunctionComponent<TableCellProps> = ({ cell }) => {
  return (
    <td
      className={
        "p-2 [&:nth-child(n+3)]:border-x "
        + "first:text-left first:px-0 last:border-none"
      }
      key={cell.id}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>)
}
