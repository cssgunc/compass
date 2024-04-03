import { XMarkIcon } from "@heroicons/react/24/solid"

export const Tag = ({children, handleDelete, active = false}) => {

    return (
        <span className="font-normal text-gray-800 flex flex-row p-1 px-2 rounded-lg bg-blue-100">{children}
        {active && <button className="hover:bg-gray-200" onClick={() => handleDelete(children)}><XMarkIcon  className=" ml-1 w-3 text-blue-500" /></button>}
        </span>
    )
}