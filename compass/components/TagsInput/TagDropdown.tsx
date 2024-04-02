
import { Tag } from "./Tag";
import { DropdownAction } from "./DropdownAction";

export const TagDropdown = ({ tags }) => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {tags.map((tag, index) => (
        <div key={index} className="items-center rounded-md p-1 flex flex-row justify-between hover:bg-gray-100">
          <Tag>{tag}</Tag>
          <DropdownAction tag={tag} />
        </div>
      ))}
    </div>
  );
};
