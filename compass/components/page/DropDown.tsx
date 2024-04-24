import React, { ChangeEvent, FunctionComponent } from "react";

// Define the shape of a single option
interface DropdownOption {
    label: string;
    value: string | number;
}

// Define the props for the Dropdown component
interface DropdownProps {
    options: DropdownOption[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void; // Type for change event on <select>
    defaultValue?: string | number;
    id?: string;
}

// Dropdown Component
const Dropdown: FunctionComponent<DropdownProps> = ({
    options,
    onChange,
    defaultValue,
    id,
}) => {
    return (
        <select
            id={id}
            defaultValue={defaultValue}
            onChange={onChange}
            className="form-select form-select-lg mb-3"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
