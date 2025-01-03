import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

interface TagProps {
    children: string;
    handleDelete?: (tag: string) => void;
    active?: boolean;
}

export const Tag = ({ children, handleDelete, active = false }: TagProps) => {
    return (
        <span
            className={`font-normal bg-purple-100 text-gray-800 flex flex-row p-1 px-2 rounded-lg`}
        >
            {children}
            {active && handleDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(children);
                    }}
                >
                    <XMarkIcon className={`ml-1 w-3 text-purple-500`} />
                </button>
            )}
        </span>
    );
};
