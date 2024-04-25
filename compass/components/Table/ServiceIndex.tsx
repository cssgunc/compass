// for showcasing to compass

import users from "./users.json";
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
import {
    ChangeEvent,
    useState,
    useEffect,
    FunctionComponent,
    useRef,
    ChangeEventHandler,
    Key,
} from "react";
import { RowOptionMenu } from "./RowOptionMenu";
import { RowOpenAction } from "./RowOpenAction";
import { TableAction } from "./TableAction";
import {
    AtSymbolIcon,
    Bars2Icon,
    ArrowDownCircleIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import TagsInput from "../TagsInput/Index";
import { rankItem } from "@tanstack/match-sorter-utils";
import Service from "@/utils/models/Service";

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

// TODO: Rename everything to service
export const ServiceTable = ({ users }: { users: Service[] }) => {
    const columnHelper = createColumnHelper<Service>();

    useEffect(() => {
        const sortedUsers = [...users].sort((a, b) =>
            a.visible === b.visible ? 0 : a.visible ? -1 : 1
        );
        setData(sortedUsers);
    }, [users]);

    const deleteUser = (userId: number) => {
        console.log(data);
        setData((currentData) =>
            currentData.filter((user) => user.id !== userId)
        );
    };

    const hideUser = (userId: number) => {
        console.log(`Toggling visibility for user with ID: ${userId}`);
        setData((currentData) => {
            const newData = currentData
                .map((user) => {
                    if (user.id === userId) {
                        return { ...user, visible: !user.visible };
                    }
                    return user;
                })
                .sort((a, b) =>
                    a.visible === b.visible ? 0 : a.visible ? -1 : 1
                );

            console.log(newData);
            return newData;
        });
    };
    const [presetOptions, setPresetOptions] = useState([
        "administrator",
        "volunteer",
        "employee",
    ]);
    const [tagColors, setTagColors] = useState(new Map());

    const getTagColor = (tag: string) => {
        if (!tagColors.has(tag)) {
            const colors = [
                "bg-cyan-100",
                "bg-blue-100",
                "bg-green-100",
                "bg-yellow-100",
                "bg-purple-100",
            ];
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            setTagColors(new Map(tagColors).set(tag, randomColor));
        }
        return tagColors.get(tag);
    };

    const columns = [
        columnHelper.display({
            id: "options",
            cell: (props) => (
                <RowOptionMenu
                    onDelete={() => {}}
                    onHide={() => hideUser(props.row.original.id)}
                />
            ),
        }),
        columnHelper.accessor("name", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Name
                </>
            ),
            cell: (info) => (
                <RowOpenAction
                    title={info.getValue()}
                    rowData={info.row.original}
                    onRowUpdate={handleRowUpdate}
                />
            ),
        }),
        columnHelper.accessor("status", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Status
                </>
            ),
            cell: (info) => (
                <span className="ml-2 text-gray-500">{info.getValue()}</span>
            ),
        }),
        columnHelper.accessor("program", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Program
                </>
            ),
            cell: (info) => <TagsInput presetValue={info.getValue()} />,
        }),
        columnHelper.accessor("requirements", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Requirements
                </>
            ),
            cell: (info) => (
                <TagsInput
                    presetValue={
                        info.getValue()[0] !== "" ? info.getValue() : ["N/A"]
                    }
                />
            ),
        }),

        columnHelper.accessor("summary", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Summary
                </>
            ),
            cell: (info) => (
                <span className="ml-2 text-gray-500">{info.getValue()}</span>
            ),
        }),
    ];

    const [data, setData] = useState<Service[]>([...users]);

    const addUser = () => {
        setData([...data]);
    };

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

    // added this fn for editing rows
    const handleRowUpdate = (updatedRow: Service) => {
        const dataIndex = data.findIndex((row) => row.id === updatedRow.id);
        if (dataIndex !== -1) {
            const updatedData = [...data];
            updatedData[dataIndex] = updatedRow;
            setData(updatedData);
        }
    };

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
