import { Tag } from "./Tag";
import { DropdownAction } from "./DropdownAction";

interface TagDropdownProps {
    tags: Set<string>;
    handleEditTag: (oldTag: string, newTag: string) => void;
    handleDeleteTag: (tag: string) => void;
    handleAdd: (tag: string) => void;
}

export const TagDropdown = ({
    tags,
    handleEditTag,
    handleDeleteTag,
    handleAdd,
}: TagDropdownProps) => {
    return (
        <div className="z-50 flex flex-col space-y-2 mt-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 pr-2">
            {Array.from(tags).length > 0 ? (
                Array.from(tags).map((tag, index) => (
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
                ))
            ) : (
                <div className="text-gray-500 text-sm p-1">
                    No options available. Type to create new ones.
                </div>
            )}
        </div>
    );
};
