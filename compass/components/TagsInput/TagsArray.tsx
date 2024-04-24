import { Tag } from "./Tag";

export interface Tags {
    tags: string[];
    handleDelete: () => {};
    active: boolean;
}

export const TagsArray = ({ tags, handleDelete, active = false }: Tags) => {
    return (
        <div className="flex ml-2 flex-wrap gap-2 items-center">
            {Array.from(tags).map((tag, index) => {
                return (
                    <Tag
                        handleDelete={handleDelete}
                        active={active}
                        key={index}
                    >
                        {tag}
                    </Tag>
                );
            })}
        </div>
    );
};
