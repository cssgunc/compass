import {
    Row,
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getFilteredRowModel,
    ColumnFiltersState,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table";
import { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { TableAction } from "./TableAction";
import { rankItem } from "@tanstack/match-sorter-utils";
import { RowOptionMenu } from "./RowOptionMenu";
import DataPoint from "@/utils/models/DataPoint";
import CreateDrawer from "../Drawer/CreateDrawer";
import { Details } from "../Drawer/Drawer";

type TableProps<T extends DataPoint> = {
    data: T[];
    setData: Dispatch<SetStateAction<T[]>>;
    columns: ColumnDef<T, any>[];
    details: Details[];
    createEndpoint: string;
    isAdmin?: boolean;
};

/** Validates that all required fields in a new item have values */
const validateNewItem = (newItem: any, details: Details[]): boolean => {
    const hasEmptyFields = details.some((detail) => {
        const value = newItem[detail.key];
        return (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        );
    });

    if (hasEmptyFields) {
        alert("Please fill in all fields before creating a new item");
        return false;
    }
    return true;
};

/** Fuzzy search function */
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

/**
 * General componenet that holds shared functionality for any data table component
 * @param props.data Stateful list of data to be held in the table
 * @param props.setData State setter for the list of data
 * @param props.columns Column definitions made with Tanstack columnHelper
 */
export default function Table<T extends DataPoint>({
    data,
    setData,
    columns,
    details,
    createEndpoint,
    isAdmin = false,
}: TableProps<T>) {
    const [filters, setFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnHelper = createColumnHelper<T>();

    const createRow = async (newItem: any) => {
        const response = await fetch(createEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });

        return response;
    };

    // /** Sorting function based on visibility */
    // const visibilitySort = (a: T, b: T) =>
    //     a.visible === b.visible ? 0 : a.visible ? -1 : 1;

    // // Sort data on load
    // useEffect(() => {
    //     setData((prevData) => prevData.sort(visibilitySort));
    // }, [setData]);

    // // Data manipulation methods
    // // TODO: Connect data manipulation methods to the database (deleteData, hideData, addData)
    // const deleteData = (dataId: number) => {
    //     console.log(data);
    //     setData((currentData) =>
    //         currentData.filter((data) => data.id !== dataId)
    //     );
    // };

    // const hideData = (dataId: number) => {
    //     console.log(`Toggling visibility for data with ID: ${dataId}`);
    //     setData((currentData) => {
    //         const newData = currentData
    //             .map((data) =>
    //                 data.id === dataId
    //                     ? { ...data, visible: !data.visible }
    //                     : data
    //             )
    //             .sort(visibilitySort);

    //         console.log(newData);
    //         return newData;
    //     });
    // };

    // Add data manipulation options to the first column
    columns.unshift(
        columnHelper.display({
            id: "options",
            cell: (props) => (
                <RowOptionMenu
                    onDelete={() => {}}
                    onHide={() => {}}
                    // onDelete={() => deleteData(props.row.original.id)}
                    // onHide={() => hideData(props.row.original.id)}
                />
            ),
        })
    );

    // Searching
    const [query, setQuery] = useState("");
    const handleSearchChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setQuery(String(target.value));
    };

    // TODO: Filtering

    // TODO: Sorting

    // Define Tanstack table
    const table = useReactTable({
        columns,
        data,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            globalFilter: query,
            columnFilters: filters,
            sorting,
        },
        onGlobalFilterChange: setQuery,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setFilters,
        onSortingChange: setSorting,
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
                                        "p-2 border-gray-200 border-y font-medium cursor-pointer select-none" +
                                        (1 < i && i < columns.length - 1
                                            ? "border-x"
                                            : "")
                                    }
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={
                                        header.column.getCanSort()
                                            ? header.column.getNextSortingOrder() ===
                                              "asc"
                                                ? "Sort ascending"
                                                : header.column.getNextSortingOrder() ===
                                                  "desc"
                                                ? "Sort descending"
                                                : "Clear sort"
                                            : undefined
                                    }
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                    {{
                                        asc: "🔼",
                                        desc: "🔽",
                                    }[header.column.getIsSorted() as string] ??
                                        null}
                                    {header.column.getCanFilter() && (
                                        <Filter column={header.column} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        // Individual row
                        const isDataVisible = row.original.visible;
                        const rowClassNames = `text-gray-800 border-y lowercase hover:bg-gray-50 ${
                            !isDataVisible ? "bg-gray-200 text-gray-500" : ""
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
                    {isAdmin && ( // Only show create drawer for admins
                        <tr>
                            <td
                                className="p-3 border-y border-gray-200"
                                colSpan={100}
                            >
                                <CreateDrawer
                                    details={details}
                                    onCreate={(newItem) => {
                                        if (
                                            !validateNewItem(newItem, details)
                                        ) {
                                            return false;
                                        }

                                        createRow(newItem).then((response) => {
                                            if (response.ok) {
                                                newItem.visible = true;
                                                setData((prev) => [
                                                    ...prev,
                                                    newItem,
                                                ]);
                                            }
                                        });

                                        return true;
                                    }}
                                />
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
}

function Filter({ column }: { column: any }) {
    return (
        <div>
            <input
                type="text"
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => {
                    column.setFilterValue(e.target.value);
                }}
                placeholder="Search..."
                className="border border-gray-300 rounded p-1"
            />
        </div>
    );
}
