import { FunnelIcon as FunnelIconOutline } from "@heroicons/react/24/outline";
import {
    FunnelIcon,
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
                            (showFilterBox ? "bg-purple-100" : "")
                        }
                        onClick={toggleFilterBox}
                    >
                        {!showFilterBox && (
                            <FunnelIconOutline className="h-5 w-5 text-gray-500" />
                        )}
                        {showFilterBox && (
                            <FunnelIcon className="h-5 w-5 text-purple-800" />
                        )}
                    </button>
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
                <p className="font-medium text-medium text-gray-800">
                    Need to find something? Use the search bar above to get your
                    results.
                </p>
            </div>
        </div>
    );
};
