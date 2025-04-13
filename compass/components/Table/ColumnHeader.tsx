import { flexRender, Header } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";
import {
    CheckIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    FunnelIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

function DropdownCheckIcon({ className }: { className?: string }) {
    return (
        <CheckIcon className={`w-4 h-4 ml-auto ${className}`} strokeWidth={2} />
    );
}

/**
 * Component for rendering the header of a table column,
 * as well as the dropdown menu for sorting and filtering.
 */
export function ColumnHeader<T>({ header }: { header: Header<T, unknown> }) {
    const { column } = header;

    const [dropdownType, setDropdownType] = useState<"menu" | "filter" | null>(
        null
    );
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
        null
    );

    const isFiltered =
        column.getFilterValue() !== undefined &&
        column.getFilterValue() !== null &&
        column.getFilterValue() !== "";

    const headerRef = useRef<HTMLTableCellElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close the dropdown menu/filter input when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as Node;
            const clickOutsideMenu =
                menuRef.current && !menuRef.current.contains(target);
            const clickOutsideFilter =
                filterRef.current && !filterRef.current.contains(target);

            if (clickOutsideMenu || clickOutsideFilter) {
                setDropdownType(null);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [dropdownType]);

    // Set the sort direction based on the current state
    useEffect(() => {
        switch (sortDirection) {
            case "asc":
                column.toggleSorting(false);
                break;
            case "desc":
                column.toggleSorting(true);
                break;
            default:
                column.clearSorting();
        }
    }, [sortDirection, column]);

    return (
        <th
            scope="col"
            className="border-gray-200 border-y font-medium"
            ref={headerRef}
        >
            <div>
                {header.isPlaceholder ? null : (
                    <div
                        className="flex p-2 h-auto items-center justify-between px-2 relative cursor-pointer hover:bg-gray-200/50"
                        onClick={() =>
                            setDropdownType((prev) =>
                                prev === null ? "menu" : null
                            )
                        }
                    >
                        <div className="flex items-center">
                            {flexRender(
                                column.columnDef.header,
                                header.getContext()
                            )}
                            {/* Choose the icon based on sort direction */}
                            {{
                                asc: <ArrowUpIcon className="w-3 h-3 ml-1" />,
                                desc: (
                                    <ArrowDownIcon className="w-3 h-3 ml-1" />
                                ),
                            }[column.getIsSorted() as string] ?? null}
                        </div>
                    </div>
                )}
            </div>
            <div className="relative">
                {/* Dropdown menu to add sorting or filter */}
                {column.getCanFilter() && dropdownType === "menu" && (
                    <div
                        ref={menuRef}
                        className="absolute flex flex-col justify-center items-center -top-2 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                    >
                        <button
                            className="flex items-center w-full text-left px-4 py-2 text-xs hover:bg-gray-100"
                            onClick={() => {
                                setSortDirection((prev) =>
                                    prev === "asc" ? null : "asc"
                                );
                                setDropdownType(null);
                            }}
                        >
                            <ArrowUpIcon className="w-4 h-4 mr-2" />
                            <span>Sort Ascending</span>
                            {sortDirection === "asc" && <DropdownCheckIcon />}
                        </button>
                        <button
                            className="flex items-center w-full text-left px-4 py-2 text-xs hover:bg-gray-100"
                            onClick={() => {
                                setSortDirection((prev) =>
                                    prev === "desc" ? null : "desc"
                                );
                                setDropdownType(null);
                            }}
                        >
                            <ArrowDownIcon className="w-4 h-4 mr-2" />
                            <span>Sort Descending</span>
                            {sortDirection === "desc" && <DropdownCheckIcon />}
                        </button>
                        <hr className="w-40" />
                        <button
                            className="flex items-center w-full text-left px-4 py-2 text-xs hover:bg-gray-100"
                            onClick={() => {
                                column.getCanFilter() &&
                                    column.setFilterValue("");
                                setDropdownType(isFiltered ? null : "filter");
                            }}
                        >
                            {isFiltered ? (
                                <>
                                    <FunnelIcon className="`w-4 h-4 mr-2 text-red-400" />
                                    <span className="text-red-400">
                                        Clear Filter
                                    </span>
                                    <XMarkIcon className="w-4 h-4 ml-auto text-red-400" />
                                </>
                            ) : (
                                <>
                                    <FunnelIcon className="w-4 h-4 mr-2" />
                                    <span>Add Filter</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
                {/* Dropdown menu to add a filter value */}
                {column.getCanFilter() && dropdownType === "filter" && (
                    <div
                        ref={filterRef}
                        className="absolute -top-2 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                    >
                        <div className="flex flex-col px-4 py-2">
                            <span>Contains</span>
                            <input
                                type="text"
                                value={
                                    (column.getFilterValue() ?? "") as string
                                }
                                onChange={(e) => {
                                    column.setFilterValue(e.target.value);
                                }}
                                placeholder="Filter..."
                                className="border border-gray-300 rounded p-1"
                            />
                        </div>
                    </div>
                )}
            </div>
        </th>
    );
}
