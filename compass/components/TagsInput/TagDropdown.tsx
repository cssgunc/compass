import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { Tag } from "./Tag"

export const TagDropdown = ({tags}) => {
    return (
        <div className="flex flex-col space-y-2 mt-2">
            
            {tags.map((tag) => {
                return <div className="rounded-md p-1 flex flex-row justify-between hover:bg-gray-100"><Tag>{tag}</Tag><EllipsisHorizontalIcon className="w-5 text-gray-500" /></div>
            })}
            
            
        </div>
    )
}