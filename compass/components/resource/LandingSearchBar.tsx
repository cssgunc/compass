import { FunnelIcon as FunnelIconOutline } from "@heroicons/react/24/outline";
import {
    ArchiveBoxIcon,
    ChevronDownIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    TagIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import React, {
    ReactNode,
    SetStateAction,
    useState,
    useRef,
    useEffect,
} from "react";
import Image from "next/image";
import { SearchResult } from "./SearchResult";

// TODO: Actually implement search.
import sampleResults from "./sample_results.json";

export const LandingSearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showFilterBox, setShowFilterBox] = useState(false);
    const toggleFilterBox = () => setShowFilterBox((prev) => !prev);

    const collections = ["Resources", "Services"];
    const [selectedCollections, setSelectedCollections] = useState(
        new Array(collections.length).fill(false)
    );

    const tags = ["Food Relief", "Period Poverty", "Nutrition Education"];
    const [selectedTags, setSelectedTags] = useState(
        new Array(tags.length).fill(false)
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="w-9/12">
            {/* searchbar  */}
            <div className="flex items-center bg-white border border-gray-200 shadow rounded-md px-4 py-2">
                {/* Left side: magnifying glass icon and input */}
                <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                />

                <input
                    className="sm:text-sm flex-grow text-gray-800 w-full px-3 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Search…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                {/* Right side icons */}
                <div className="flex gap-1">
                    {/* If search bar is not empty, include clear icon */}
                    {searchTerm && (
                        <button
                            onClick={clearSearch}
                            className="hover:bg-purple-100 rounded-md p-1"
                        >
                            <XMarkIcon
                                className="h-5 w-5 text-gray-500"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                    {/* Filter button */}
                    <button
                        className={
                            "hover:bg-purple-100 rounded-md p-1 " +
                            (showFilters ? "bg-purple-100" : "")
                        }
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {!showFilters && (
                            <FunnelIconOutline className="h-5 w-5 text-gray-500" />
                        )}
                        {showFilters && (
                            <FunnelIcon className="h-5 w-5 text-purple-800" />
                        )}
                    </button>
                </div>
            </div>

            {/* Search filters */}
            <div className={"mt-2 flex " + (showFilters ? "" : "hidden")}>
                <FilterPill
                    icon={ArchiveBoxIcon}
                    name="In"
                    options={collections}
                    selectedOptions={selectedCollections}
                    setSelectedOptions={setSelectedCollections}
                />
                <FilterPill
                    icon={TagIcon}
                    name="Tags"
                    options={tags}
                    selectedOptions={selectedTags}
                    setSelectedOptions={setSelectedTags}
                    searchBar
                />
            </div>

            {/* search results, for now since it's empty this is the default screen  */}
            <div
                className={
                    "flex flex-col pt-16 space-y-2 justify-center items-center" +
                    (searchTerm.length > 0 ? " hidden" : "")
                }
            >
                <Image
                    alt="Landing illustration"
                    src="/landing_illustration.png"
                    width={250}
                    height={250}
                />
                <p className="font-medium text-medium text-gray-800">
                    Need to find something? Use the search bar above to get your
                    results.
                </p>
            </div>

            <div
                className={
                    "p-1 flex flex-col gap-1 mt-2" +
                    (searchTerm.length > 0 ? "" : " hidden")
                }
            >
                {sampleResults.map((result, i) => (
                    <SearchResult
                        key={i}
                        type={result.type}
                        name={result.name}
                        description={result.description}
                    />
                ))}
            </div>
        </div>
    );
};

// Closes the filter dropdown when the user clicks outside the dropdown.
const useFilterPillDropdown = (
    ref: React.RefObject<HTMLDivElement>,
    setShowDropdown: Function
) => {
    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (setShowDropdown) setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            // Unbind the event listener on cleanup.
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, setShowDropdown]);
};

// Props for the filter pill...
interface FilterPillProps {
    icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref">
    >;
    name: string;
    searchBar?: boolean;
    options: string[];
    selectedOptions: boolean[];
    setSelectedOptions: React.Dispatch<SetStateAction<boolean[]>>;
}

// The filter pill (visible when filter button active, contains dropdown)
const FilterPill: React.FC<FilterPillProps> = ({
    icon,
    name,
    options,
    selectedOptions,
    setSelectedOptions,
    searchBar = false,
}) => {
    const Icon = icon;
    const [showDropdown, setShowDropdown] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCheck = (
        e: React.ChangeEvent<HTMLInputElement>,
        item: string
    ) => {
        const selected = selectedOptions.map((o, i) => {
            if (i == options.indexOf(item)) {
                return e.target.checked;
            } else {
                return o;
            }
        });

        setSelectedOptions(selected);
        setIsActive(selected.includes(true));
    };

    // Closes dropdown when clicked outside
    useFilterPillDropdown(dropdownRef, setShowDropdown);

    return (
        <div
            className={
                "border rounded-2xl w-max px-2 py-0.5 text-sm mr-2 relative " +
                (isActive
                    ? "border-purple-800 text-purple-800 bg-purple-100"
                    : "border-gray-400 text-gray-400 hover:bg-gray-100")
            }
        >
            {/* The filter pill */}
            <button
                className="flex gap-1 items-center"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <Icon className="h-4 w-4" />
                <span className="max-w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                    {/* Displaying the selected options */}
                    {options.reduce(
                        (a, b, i) =>
                            a +
                            (selectedOptions[i] // If selected, append option
                                ? (a === "" ? ": " : ", ") + b // (prepend ": " if first element, ", " if not)
                                : ""),
                        ""
                    )}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* The filter option selection dropdown */}
            <div
                ref={dropdownRef}
                className={
                    "absolute top-full mt-0.5 left-0 border border-gray-200 bg-white shadow-lg rounded-md p-1.5 w-48 " +
                    (showDropdown ? "flex flex-col" : "hidden")
                }
            >
                <input
                    className="border w-full rounded-md mb-1 text-gray-600 p-1"
                    type="text"
                    placeholder={"Search " + name.toLowerCase()}
                    hidden={!searchBar}
                />
                {options.map((item, index) => {
                    return (
                        <label className="text-gray-800" key={index}>
                            <input
                                type="checkbox"
                                name="name"
                                className="mr-1"
                                checked={selectedOptions[index]}
                                onChange={(e) => handleCheck(e, item)}
                            />
                            {item}
                        </label>
                    );
                })}
            </div>
        </div>
    );
};
