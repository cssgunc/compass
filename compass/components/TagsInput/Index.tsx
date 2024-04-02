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
  const [tags, setTags] = useState<string[]>([presetValue]);
  const [options, setOptions] = useState<string[]>(presetOptions);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTags(prevTags => [...prevTags, inputValue]);
      setOptions(prevOptions => [...prevOptions, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleBlur = () => {
    setCellSelected(false);
  };

  return (
    <div className="w-50 cursor-pointer" onClick={() => setCellSelected(true)}>
      {!cellSelected ? (
        <TagsArray tags={tags} />
      ) : (
        <div className="absolute z-50 -mt-6">
          <div className="rounded-md border border-gray-200 shadow">
            <div className="flex flex-wrap rounded-t-md items-center gap-2 bg-gray-50 p-2">
              <TagsArray active tags={tags} />
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
