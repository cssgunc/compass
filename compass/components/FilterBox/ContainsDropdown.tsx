import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const mockTags = ["food relief", "period poverty", "nutrition education"];

type FilterType = "contains" | "does not contain" | "is empty" | "is not empty";

export const ContainsDropdown = ({
    isDropdownOpen,
    setIsDropdownOpen,
    filterType,
    setFilterType,
}) => {
    const handleFilterTypeChange = (type: FilterType) => {
        setFilterType(type);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative">
            <div
                className={`absolute z-10 mt-8 -top-28 bg-white border border-gray-300 rounded-md shadow-md p-2 ${
                    isDropdownOpen ? "block" : "hidden"
                }`}
            >
                <div
                    className="cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => handleFilterTypeChange("contains")}
                >
                    Contains
                </div>
                <div
                    className="cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => handleFilterTypeChange("does not contain")}
                >
                    Does not contain
                </div>
                <div
                    className="cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => handleFilterTypeChange("is empty")}
                >
                    Is empty
                </div>
                <div
                    className="cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => handleFilterTypeChange("is not empty")}
                >
                    Is not empty
                </div>
            </div>
        </div>
    );
};
