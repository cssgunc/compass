// TableAction.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEventHandler, FunctionComponent, useRef, useState } from "react";
import { FilterBox } from "../FilterBox";

type TableActionProps = {
    query: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
};

export const TableAction: FunctionComponent<TableActionProps> = ({
    query,
    handleChange,
}) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [searchActive, setSearchActive] = useState(false);
    const [showFilterBox, setShowFilterBox] = useState(false);

    const activateSearch = () => {
        setSearchActive(true);
        if (searchInput.current === null) {
            return;
        }
        searchInput.current.focus();
        searchInput.current.addEventListener("focusout", () => {
            if (searchInput.current?.value.trim() === "") {
                searchInput.current.value = "";
                deactivateSearch();
            }
        });
    };

    const deactivateSearch = () => setSearchActive(false);

    const toggleFilterBox = () => setShowFilterBox((prev) => !prev);

    return (
        <div className="w-auto flex flex-row gap-x-0.5 items-center justify-between text-xs font-medium text-gray-500 p-2">
            <span
                className="p-1 rounded hover:text-purple-700 focus:bg-purple-50 hover:bg-purple-50"
                onClick={toggleFilterBox}
            >
                Filter
            </span>
            {showFilterBox && <FilterBox />}
            <span className="p-1 rounded  hover:text-purple-700 focus:bg-purple-50 hover:bg-purple-50 hover:bg-gray-100">
                Sort
            </span>
            <span
                className="p-1 rounded  hover:text-purple-700 focus:bg-purple-50 hover:bg-purple-50 hover:bg-gray-100"
                onClick={activateSearch}
            >
                <MagnifyingGlassIcon className="w-4 h-4 inline" />
            </span>
            <input
                ref={searchInput}
                className={
                    "outline-none transition-all duration-300 " +
                    (searchActive ? "w-48" : "w-0")
                }
                type="text"
                name="search"
                placeholder="Type to search..."
                value={query ?? ""}
                onChange={handleChange}
            />
        </div>
    );
};
