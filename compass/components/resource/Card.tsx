import React, { ReactNode } from "react";

interface TagProps {
    text: string;
    icon: React.ReactNode;
}

const Card: React.FC<TagProps> = ({ text, icon }) => {
    return (
        <div className="flex flex-row space-x-2 items-start justify-start border border-gray-200 bg-white hover:bg-gray-50 shadow rounded-md p-4">
            <span className="h-5 text-purple-700 w-5">{icon}</span>
            <span className="text-sm text-gray-800 font-semibold">{text}</span>
        </div>
    );
};

export default Card;
