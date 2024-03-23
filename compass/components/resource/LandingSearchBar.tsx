import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import React, { useState } from 'react';

export const LandingSearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const clearSearch = () => {
      setSearchTerm('');
    };
  
    return (
      <div className="max-w mx-auto">
        <div className="flex items-center bg-white border border-gray-200 shadow rounded-md">
          <div className="flex-grow">
            <input
              className="sm:text-sm w-full px-6 py-3 rounded-md focus:outline-none"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {searchTerm && (
            <button
              onClick={clearSearch}
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </button>
          )}
          <div className="p-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
        </div>
        
      </div>
    );
  };
