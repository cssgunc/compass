
import { Tag } from "./Tag";
import { DropdownAction } from "./DropdownAction";

export const TagDropdown = ({ tags, handleAdd }) => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {Array.from(tags).map((tag, index) => (
        <div onClick={() => handleAdd(tag)} key={index} className="items-center rounded-md p-1 flex flex-row justify-between hover:bg-gray-100">
          <Tag>{tag}</Tag>
          <DropdownAction tag={tag} />
        </div>
      ))}
    </div>
  );
};
