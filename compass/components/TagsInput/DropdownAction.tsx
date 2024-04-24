import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const DropdownAction = ({ tag, handleDeleteTag, handleEditTag }) => {
    const [isVisible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState(tag);

    const editTagOption = (e) => {
        if (e.key === "Enter") {
            handleEditTag(tag, inputValue);
            setVisible(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <EllipsisHorizontalIcon
                className="w-5 text-gray-500"
                onClick={() => setVisible(!isVisible)}
            />
            {isVisible && (
                <div className="absolute flex flex-col justify-start z-50 rounded-md bg-white border border-gray-200 shadow p-2 space-y-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={editTagOption}
                        autoFocus
                        className="bg-gray-50 text-2xs focus:outline-none rounded-md font-normal text-gray-800 p-1 border-2 focus:border-blue-200"
                    />
                    <button
                        onClick={() => {
                            handleDeleteTag(inputValue);
                            setVisible(false);
                        }}
                        className="justify-start flex flex-row space-x-4 hover:bg-gray-100 rounded-md items-center p-2 px-2"
                    >
                        <TrashIcon className="w-3 h-3" />
                        <p>Delete</p>
                    </button>
                </div>
            )}
        </div>
    );
};
