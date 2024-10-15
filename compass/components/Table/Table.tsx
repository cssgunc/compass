import { Row, ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import {
    ChangeEvent,
    useState,
    useEffect,
    Key,
} from "react";
import { TableAction } from "./TableAction";
import {
    PlusIcon,
} from "@heroicons/react/24/solid";
import { rankItem } from "@tanstack/match-sorter-utils";
import Resource from "@/utils/models/Resource";

// For search
const fuzzyFilter = (
    row: Row<any>,
    columnId: string,
    value: any,
    addMeta: (meta: any) => void
) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export const Table = ({ initialData, columns }: { initialData: Resource[], columns: ColumnDef<any, any>[] }) => {
    useEffect(() => {
        const sortedData = [...initialData].sort((a, b) =>
            a.visible === b.visible ? 0 : a.visible ? -1 : 1
        );
        setData(sortedData);
    }, [initialData]);

    const [data, setData] = useState<Resource[]>([...initialData]);

    // Searching
    const [query, setQuery] = useState("");
    const handleSearchChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setQuery(String(target.value));
    };

    const handleCellChange = (e: ChangeEvent, key: Key) => {
        const target = e.target as HTMLInputElement;
        console.log(key);
    };

    // TODO: Filtering

    // TODO: Sorting
    
    const table = useReactTable({
        columns,
        data,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter: query,
        },
        onGlobalFilterChange: setQuery,
        globalFilterFn: fuzzyFilter,
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
                                        "p-2 border-gray-200 border-y font-medium " +
                                        (1 < i && i < columns.length - 1
                                            ? "border-x"
                                            : "")
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
                        const rowClassNames = `text-gray-800 border-y lowercase hover:bg-gray-50 ${
                            !isUserVisible ? "bg-gray-200 text-gray-500" : ""
                        }`;
                        return (
                            <tr className={rowClassNames} key={row.id}>
                                {row.getVisibleCells().map((cell, i) => (
                                    <td
                                        key={cell.id}
                                        className={
                                            "[&:nth-child(n+3)]:border-x relative first:text-left first:px-0 last:border-none"
                                        }
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td
                            className="p-3 border-y border-gray-200 text-gray-600 hover:bg-gray-50"
                            colSpan={100}
                            onClick={addUser}
                        >
                            <span className="flex ml-1 text-gray-500">
                                <PlusIcon className="inline h-4 mr-1" />
                                New
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
