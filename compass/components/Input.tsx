import { Icons } from '@/utils/constants';
import React, { FunctionComponent, InputHTMLAttributes, ReactElement, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  iconKey?: keyof typeof Icons; // Use keyof typeof to ensure the key exists in Icons
  title?: string; // Assuming title is always a string
  type?: string;
  placeholder?: string;
};

const Input: FunctionComponent<InputProps> = ({ iconKey, type, title, placeholder, ...rest }) => {
  const IconComponent = iconKey ? Icons[iconKey] : null;
  
  return (
    <div className="mb-4">
      {title && (
        <div className="mb-1">
          <label htmlFor={title} className="text-sm font-semibold text-gray-700">
            {title}
          </label>
        </div>
      )}
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm overflow-hidden">
        {IconComponent && (
          <span className="inline-flex items-center px-3 border-r border-gray-300 text-gray-500">
            <IconComponent className="h-5 w-5" />
          </span>
        )}
        <input
          {...rest}
          type={type}
          id={title}
          placeholder={placeholder}
          className="w-full border-none p-3 text-sm focus:ring-0"
          style={{ boxShadow: 'none' }} // This ensures that the input doesn't have an inner shadow
        />
      </div>
    </div>
  );
};

export default Input;
