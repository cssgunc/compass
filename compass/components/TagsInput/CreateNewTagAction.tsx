import { Tag } from "./Tag";

interface NewTagProps {
    input: string;
    addTag: () => void;
}

export const CreateNewTagAction = ({ input, addTag }: NewTagProps) => {
    return (
        <button
            className="flex flex-row space-x-2 hover:bg-gray-100 rounded-md py-2 p-2 items-center"
            onClick={addTag}
        >
            <p className="capitalize">Create</p>
            <Tag active={false}>{input}</Tag>
        </button>
    );
};
