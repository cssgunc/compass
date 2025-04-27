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
import {
    ChangeEvent,
    useState,
    Dispatch,
    SetStateAction,
} from "react";
import { TableSearch } from "@/components/Table/TableSearch";
import { RowOptionMenu } from "@/components/Table/RowOptionMenu";
import { ColumnHeader } from "@/components/Table/ColumnHeader";
import CreateDrawer from "@/components/Drawer/CreateDrawer";
import { Details } from "@/components/Drawer/Drawer";
import DataPoint from "@/utils/models/DataPoint";
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "./FilterDropdown";

type TableProps<T extends DataPoint> = {
    data: T[];
    setData: Dispatch<SetStateAction<T[]>>;
    columns: ColumnDef<T, any>[];
    setFilterFn?: (field: string, filterFn: FilterFn) => void;
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
    setFilterFn,
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
                <TableSearch query={query} handleChange={handleSearchChange} />
            </div>
            <table className="w-full text-xs text-left rtl:text-right">
                <thead className="text-xs text-gray-500 capitalize">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, i) => (
                                <ColumnHeader
                                    header={header}
                                    details={details.find(
                                        (d) => d.key === header.column.id
                                    )}
                                    setFilterFn={setFilterFn}
                                    key={header.id}
                                />
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
                                        className={`[&:nth-child(n+3)]:border-x pl-2 relative first:text-left first:px-0 last:border-none ${
                                            cell.column.getIsFiltered()
                                                ? "bg-purple-50"
                                                : ""
                                        }`}
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
