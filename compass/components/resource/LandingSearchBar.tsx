import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Image from "next/image";
import { FilterBox } from "../FilterBox";

export const LandingSearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterBox, setShowFilterBox] = useState(false);
    const toggleFilterBox = () => setShowFilterBox((prev) => !prev);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="max-w mx-auto">
            {/* searchbar  */}
            <div className="flex items-center bg-white border border-gray-200 shadow rounded-md">
                <div className="flex-grow">
                    <input
                        className="sm:text-sm text-gray-800 w-full px-6 py-3 rounded-md focus:outline-none"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {/* input  */}
                {searchTerm && (
                    <button onClick={clearSearch}>
                        <XMarkIcon
                            className="h-5 w-5 text-gray-500"
                            aria-hidden="true"
                        />
                    </button>
                )}
                <div className="flex flex-row space-x-1 p-3">
                    <span>
                        <ChevronDownIcon
                            className="h-5 w-5 text-gray-500"
                            onClick={toggleFilterBox}
                        />
                    </span>
                    {showFilterBox && <FilterBox className="relative top-50" />}
                    <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                    />
                </div>
            </div>
            {/* search results, for now since it's empty this is the default screen  */}
            <div className="flex flex-col pt-16 space-y-2 justify-center items-center">
                <Image
                    alt="Landing illustration"
                    src="/landing_illustration.png"
                    width={250}
                    height={250}
                />
                <h2 className="font-medium text-medium text-gray-800">
                    Need to find something? Use the links or the search bar
                    above to get your results.
                </h2>
            </div>
        </div>
    );
};
