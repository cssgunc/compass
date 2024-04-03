import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { TagsArray } from './TagsArray'; // Corrected path assumption
import { TagDropdown } from './TagDropdown';

interface TagsInputProps {
  presetOptions: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({ presetValue, presetOptions }) => {
  const [inputValue, setInputValue] = useState('');
  const [cellSelected, setCellSelected] = useState(false);
  const [tags, setTags] = useState<Set<string>>(new Set(presetValue ? [presetValue] : []));
  const [options, setOptions] = useState<Set<string>>(new Set(presetOptions));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      // To add to a Set, you need to create a new Set for immutability in React state updates.
      setTags(prevTags => new Set(prevTags).add(inputValue));
      setOptions(prevOptions => new Set(prevOptions).add(inputValue));
      setInputValue('');
    }
  };

  const handleSelectTag = (tagToAdd: string) => {
    if (!tags.has(tagToAdd)){ // Corrected syntax for checking if a Set contains an item
      setTags(prevTags => new Set(prevTags).add(tagToAdd));
    }
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(prevTags => {
      const updatedTags = new Set(prevTags);
      updatedTags.delete(tagToDelete);
      return updatedTags;
    });
  };
  const handleBlur = () => {
    setCellSelected(false);
  };

  return (
    <div className="cursor-pointer" onClick={() => setCellSelected(true)}>
      {!cellSelected ? (
        <TagsArray handleDelete={handleDeleteTag} tags={tags} />
      ) : (
        <div className="absolute w-64 z-50 -ml-3 -mt-7">
          <div className="rounded-md border border-gray-200 shadow">
            <div  className="flex flex-wrap rounded-t-md items-center gap-2 bg-gray-50 p-2">
              <TagsArray handleDelete={handleDeleteTag} active tags={tags} />
              <input
                type="text"
                value={inputValue}
                placeholder="Search for an option..."
                onChange={handleInputChange}
                onKeyDown={handleAddTag}
                className="focus:outline-none bg-transparent"
                autoFocus
              />
            </div>
            <div className="flex rounded-b-md bg-white flex-col border-t border-gray-100 text-2xs font-medium text-gray-500 p-2">
              Select an option or create one
              <TagDropdown handleAdd={handleSelectTag} tags={options} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsInput;
