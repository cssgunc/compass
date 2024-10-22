import { Tag } from "./Tag";
import { DropdownAction } from "./DropdownAction";

export const TagDropdown = ({
    tags,
    handleEditTag,
    handleDeleteTag,
    handleAdd,
}) => {
    return (
        <div className="z-50 flex flex-col space-y-2 mt-2">
            {Array.from(tags).map((tag, index) => (
                <div
                    key={index}
                    className="items-center rounded-md p-1 flex flex-row justify-between hover:bg-gray-100"
                >
                    <button onClick={() => handleAdd(tag)}>
                        <Tag>{tag}</Tag>
                    </button>
                    <DropdownAction
                        handleDeleteTag={handleDeleteTag}
                        handleEditTag={handleEditTag}
                        tag={tag}
                    />
                </div>
            ))}
        </div>
    );
};
