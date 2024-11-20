import React from "react";
import {
    BookmarkIcon,
    ClipboardIcon,
    QuestionMarkCircleIcon,
    ArrowUturnRightIcon,
} from "@heroicons/react/24/solid";

interface SearchResultProps {
    type: "resource" | "service" | string;
    name: string;
    description: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({
    type,
    name,
    description,
}) => {
    const Icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref">
    > =
        type === "resource"
            ? BookmarkIcon
            : type === "service"
            ? ClipboardIcon
            : QuestionMarkCircleIcon; // Unknown type

    return (
        <div className="flex justify-between items-center w-full p-2 rounded-md hover:bg-purple-100 cursor-pointer group">
            {/* Left side of the item */}
            <div className="flex gap-2 items-center max-w-[95%]">
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span className="font-medium flex-grow text-nowrap">
                    {name}
                </span>
                <span className="text-gray-400 text-nowrap overflow-hidden text-ellipsis flex-shrink">
                    {description}
                </span>
            </div>
            <ArrowUturnRightIcon className="h-5 w-5 rotate-180 invisible group-hover:visible" />
        </div>
    );
};
