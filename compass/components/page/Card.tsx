import React, { ReactNode, useState } from "react";


interface TagProps {
    text: string;
    icon: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}


const Card: React.FC<TagProps> = ({children, text, icon, onClick }) => {
  return (
<button
      onClick={onClick}
      className="flex flex-row space-x-2 items-start justify-start border border-gray-200 bg-white hover:bg-gray-50 shadow rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 w-1/4"
    >
      <span className="h-5 text-purple-700 w-5">
        {icon}
      </span>
      <span className="text-sm text-gray-800 font-semibold">
        {text}
      </span>
      {children}
    </button>
  );
};

export default Card;
