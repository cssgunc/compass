import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const DropdownAction = ({ tag }) => {
  const [isVisible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(tag);

  const handleBlur = () => {
    setVisible(false);
  };

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
        <div className="absolute z-50 bg-white">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoFocus
          />
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
