import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const TableAction = () => {
    return (
      <div className="w-40 flex flex-row items-center justify-between text-xs font-medium text-gray-500 p-2">
        <span>Filter</span>
        <span>Sort</span>
        <span className="w-4 h-4"><MagnifyingGlassIcon /></span>
      </div>
    );
  };
  