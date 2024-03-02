'use client'
import { Icons } from '@/utils/constants';
import React, { FunctionComponent, InputHTMLAttributes, ReactElement, ReactNode, useState} from 'react';


type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  title?: string; // Assuming title is always a string
  type?: string;
  placeholder?: string;
};

const PasswordInput: FunctionComponent<InputProps> = ({ type, title, placeholder, ...rest }) => {

  const [visible, setVisible] = useState (false);
  const PasswordIcon = visible ?  Icons['HidePasswordIcon'] : Icons['UnhidePasswordIcon'];

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

        <input
          {...rest}
          type={visible ? "text" : "password"}
          id={title}
          placeholder={placeholder}
          className="w-full border-none p-3 text-sm focus:ring-0"
          style={{ boxShadow: 'none' }} // This ensures that the input doesn't have an inner shadow
        />

        {PasswordIcon && (
          <span className="inline-flex items-center px-3 border-r border-gray-300 text-gray-500">
            <PasswordIcon className="h-5 w-5" onClick={() => setVisible(!visible)}/>
          </span>
        )}

      </div>
    </div>
  );
};

export default PasswordInput;
