import { Tag } from "./Tag";

export interface Tags {
    tags: Set<string>;
    handleDelete: (tag: string) => void;
    active: boolean;
}

export const TagsArray = ({ tags, handleDelete, active = false }: Tags) => {
    return (
        <div className="flex flex-wrap gap-2 items-center min-h-[24px] min-w-[100px] rounded-md hover:bg-gray-100 p-1">
            {Array.from(tags).length > 0 ? (
                Array.from(tags).map((tag, index) => {
                    return (
                        <Tag
                            handleDelete={handleDelete}
                            active={active}
                            key={index}
                        >
                            {tag}
                        </Tag>
                    );
                })
            ) : (
                <span className="text-gray-400 text-sm cursor-pointer">
                    Click to select tags
                </span>
            )}
        </div>
    );
};
