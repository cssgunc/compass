import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const DropdownAction = ({ tag, handleDeleteTag, handleAddTag }) => {
  const [isVisible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(tag);

  const handleBlur = () => {
    setVisible(false);
  };

  const editTagOption = () => {
    handleDeleteTag(tag)
    handleAddTag(inputValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation(); // This stops the click event from propagating
    setVisible(!isVisible); // Toggle visibility
  };

  return (
    <div>
      {isVisible ? (
        <div className="absolute flex flex-col justify-start z-50 rounded-md bg-white border border-gray-200 shadow p-2 space-y-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={editTagOption}
            onBlur={handleBlur}
            autoFocus
            className="bg-gray-50 text-2xs focus:outline-none rounded-md font-normal text-gray-800 p-1 border-2 focus:border-blue-200"
          />
          <button onClick={() => handleDeleteTag(inputValue)} className="justify-start flex flex-row space-x-4 hover:bg-gray-100 rounded-md items-center p-1 px-2">
            <TrashIcon className="w-3 h-3" />
            <p>Delete</p>
          </button>
        </div>
      ) : (
        <EllipsisHorizontalIcon
          className="w-5 text-gray-500"
          onClick={handleClick} // Attach the click event handler here
        />
      )}
    </div>
  );
};
