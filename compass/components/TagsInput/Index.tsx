import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import { TagsArray } from "./TagsArray"; 
import { TagDropdown } from "./TagDropdown";
import { CreateNewTagAction } from "./CreateNewTagAction";

interface TagsInputProps {
  presetOptions: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({
  presetValue,
  presetOptions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [cellSelected, setCellSelected] = useState(false);
  const [tags, setTags] = useState<Set<string>>(
    new Set(presetValue ? [presetValue] : [])
  );
  const [options, setOptions] = useState<Set<string>>(new Set(presetOptions));
  const dropdown = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!cellSelected) {
  //     return;
  //   }
  //   function handleOutsideClick(event: MouseEvent) {
  //     if (dropdown.current && !dropdown.current.contains(event.target as Node)) {
  //       console.log("here2")
  //       setCellSelected(false);
  //     }
  //   }

  //   if (cellSelected){
  //     window.addEventListener("click", handleOutsideClick);
  //   }

  //   return () => window.removeEventListener("click", handleOutsideClick);
  // }, [cellSelected])

  const handleClick = () => {
    if (!cellSelected) {
      setCellSelected(true);
      // Add event listener only after setting cellSelected to true
      setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      }, 100);
    }
  }

  const handleOutsideClick = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setCellSelected(false);
      // Remove event listener after handling outside click
      window.removeEventListener("click", handleOutsideClick);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(() => {
      const newOptions = presetOptions.filter(item => item.includes(e.target.value.toLowerCase()));
      return new Set(newOptions);
    })
    setInputValue(e.target.value); // Update input value state
  };
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags((prevTags) => new Set(prevTags).add(inputValue));
      setOptions((prevOptions) => new Set(prevOptions).add(inputValue));
      setInputValue("");
    }
  };

  const handleSelectTag = (tagToAdd: string) => {
    if (!tags.has(tagToAdd)) {
      // Corrected syntax for checking if a Set contains an item
      setTags((prevTags) => new Set(prevTags).add(tagToAdd));
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => {
      const updatedTags = new Set(prevTags);
      updatedTags.delete(tagToDelete);
      return updatedTags;
    });
  };

  const handleDeleteTagOption = (tagToDelete: string) => {
    setOptions((prevOptions) => {
      const updatedOptions = new Set(prevOptions);
      updatedOptions.delete(tagToDelete);
      return updatedOptions;
    });
    if (tags.has(tagToDelete)) {
      handleDeleteTag(tagToDelete);
    }
  };

  const handleEditTag = (oldTag: string, newTag: string) => {
    if (oldTag !== newTag) {
      setTags((prevTags) => {
        const tagsArray = Array.from(prevTags);
        const oldTagIndex = tagsArray.indexOf(oldTag);
        if (oldTagIndex !== -1) {
          tagsArray.splice(oldTagIndex, 1, newTag);
        }
        return new Set(tagsArray);
      });
  
      setOptions((prevOptions) => {
        const optionsArray = Array.from(prevOptions);
        const oldTagIndex = optionsArray.indexOf(oldTag);
        if (oldTagIndex !== -1) {
          optionsArray.splice(oldTagIndex, 1, newTag);
        }
        return new Set(optionsArray);
      });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      {!cellSelected ? (
        <TagsArray handleDelete={handleDeleteTag} tags={tags} />
      ) : (
        <div ref={dropdown}>
        <div className="absolute w-64 z-50 -ml-3 -mt-7">
          <div className="rounded-md border border-gray-200 shadow">
            <div className="flex flex-wrap rounded-t-md items-center gap-2 bg-gray-50 p-2">
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
              <p className="capitalize">Select an option or create one</p>
              <TagDropdown
                handleDeleteTag={handleDeleteTagOption}
                handleEditTag={handleEditTag}
                handleAdd={handleSelectTag}
                tags={options}
              />
              {inputValue.length > 0 && (
                <CreateNewTagAction input={inputValue} />
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default TagsInput;
