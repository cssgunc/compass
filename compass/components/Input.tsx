import React, { FunctionComponent, InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  title?: ReactNode;
  type?:ReactNode;
  placeholder?:ReactNode
  valid?:boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; 
};

const Input: FunctionComponent<InputProps> = ({ icon, type, title, placeholder, onChange, valid = true, ...rest }) => {
  return (
    <div>
      <label
  htmlFor={title}
  className={valid ? "block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600" : "block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600"}
>
  <span className="text-xs font-semibold text-gray-700"> {title} </span>
  <div className="mt-1 flex items-center">
  <input
    type={type}
    id={title}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
  />
  <span className="inline-flex items-center px-3 text-gray-500">
          {icon}
  </span>
  </div>
</label>
</div>
  );
};

export default Input;
