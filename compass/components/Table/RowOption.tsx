import React from "react";
import {
    TrashIcon,
    DocumentDuplicateIcon,
    ArrowUpRightIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";

export const RowOption = ({ icon: Icon, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="hover:bg-gray-100 flex items-center gap-2 p-2 w-full"
        >
            <Icon className="inline h-4" /> {label}
        </button>
    );
};
