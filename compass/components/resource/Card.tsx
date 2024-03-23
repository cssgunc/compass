import React, {ReactNode} from "react";


interface TagProps {
  text: string;
  icon: React.ReactNode;
}

const Card: React.FC<TagProps> = ({ text, icon }) => {
  return (
    <div className="flex flex-row space-x-2 items-start justify-start border border-gray-200 bg-white shadow rounded-md p-4">
      <span className="h-5 w-5 text-gray-700">
        {icon}
      </span>
      <span className="text-sm font-semibold text-gray-700">{text}</span>
    </div>
  );
};

export default Card;