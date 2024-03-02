import { FunctionComponent, ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void; // make the onClick handler optional
    type?: "button" | "submit" | "reset"; // specify possible values for type
    disabled?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({ children, type, disabled, onClick }) => {
    const buttonClassName = `inline-block rounded border ${disabled ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'border-purple-600 bg-purple-600 text-white hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500'} px-12 py-3 text-sm font-semibold`;
    return (
        <button
            className={buttonClassName}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
