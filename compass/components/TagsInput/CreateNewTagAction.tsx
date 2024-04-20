import { Tag } from "./Tag"

export const CreateNewTagAction = ({ input }) => {
    return (
        <div className="flex flex-row space-x-2 hover:bg-gray-100 rounded-md py-2 p-2 items-center">
            <p className="capitalize">Create</p>
            <Tag active={false} onDelete={null} >{input}</Tag>
        </div>
    )
} 