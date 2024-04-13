import { XMarkIcon } from "@heroicons/react/24/solid";

export const Tag = ({ children, handleDelete, active = false }) => {

  return (
    <span className={`font-normal bg-cyan-100 text-gray-800 flex flex-row p-1 px-2 rounded-lg`}>
      {children}
      {active && handleDelete && (
        <button onClick={() => handleDelete(children)}>
          <XMarkIcon className={`ml-1 w-3 text-cyan-500`} />
        </button>
      )}
    </span>
  );
};
