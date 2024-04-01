// In a file TagsInput.tsx

import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import {TagsArray} from './TagsArray'; // Assuming this is the correct path
import { TagDropdown } from './TagDropdown';

const TagsInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [cellSelected, setCellSelected] = useState(false);
  const [tags, setTags] = useState<string[]>(['Administrator']);
  const [options, setOptions] = useState<string[]>(["Administrators", "Employees", "Volunteers"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Function to handle adding new tags when enter is pressed
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  // Function to handle deleting tags
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleBlur = () => {
    setCellSelected(false);
  };

  return (
    <div
      className="w-full relative items-center cursor-pointer"
      onClick={() => setCellSelected(true)} 
    >
      {!cellSelected ? (
        <TagsArray tags={tags}  />
      ) : (
        <div className="absolute z-50 object-top">
        <div className="rounded-md  border border-gray-200 shadow">
          <div className="flex flex-wrap rounded-t-md items-center gap-2 bg-gray-50 p-2">
            <TagsArray active={true} tags={tags} />
          <input
            type="text"
            value={inputValue}
            placeholder="Search for an option..."
            onChange={handleInputChange}
            onKeyDown={handleAddTag} 
            onBlur={handleBlur} 
            className="focus:outline-none bg-transparent"
            autoFocus 
          />
          </div>
          <div className="flex rounded-b-md bg-white flex-col border-t border-gray-100 text-2xs font-medium text-gray-500 p-2">
            Select an option or create one
            <TagDropdown tags={options} />
            </div>
            
        </div>
        </div>
      )}
    </div>
  );
};

export default TagsInput;
