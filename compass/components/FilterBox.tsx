// FilterBox.tsx
import { useState } from "react";

const mockTags = ["food relief", "period poverty", "nutrition education"];

export const FilterBox = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderSelectedTags = () =>
    selectedTags.map((tag) => (
      <div
        key={tag}
        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center mr-2"
      >
        <span>{tag}</span>
        <span
          className="ml-2 cursor-pointer"
          onClick={() => handleTagChange(tag)}
        >
          &times;
        </span>
      </div>
    ));

  return (
    <div className="bg-white border border-gray-300 rounded-md p-2">
      <div className="mb-2">
        <span className="font-semibold">Tags contains:</span>
        
      </div>
      <div className="flex flex-wrap mb-2 px-2 py-1 border border-gray-300 rounded w-full">
      {selectedTags.length > 0 && renderSelectedTags()}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tags..."
        
      />
      </div>
      <div className="max-h-48 overflow-y-auto">
        {mockTags
          .filter((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((tag) => (
            <div key={tag} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="mr-2"
              />
              <label>{tag}</label>
            </div>
          ))}
      </div>
    </div>
  );
};
