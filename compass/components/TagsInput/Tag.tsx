import { XMarkIcon } from "@heroicons/react/24/solid"

export const Tag = ({children, active = false}) => {
    const handleClick = () => {
        
    }
    return (
        <span className="font-normal text-gray-800 flex flex-row p-1 px-2 rounded-lg bg-blue-100">{children}
        {active && <XMarkIcon className="ml-1 w-3 text-blue-500" />}
        </span>
    )
}