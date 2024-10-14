import { FunctionComponent, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({
    children,
    type,
    disabled,
    onClick,
}) => {
    const buttonClassName = `inline-flex items-center justify-center rounded border ${
        disabled
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "border-purple-600 bg-purple-600 text-white hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
    } px-4 py-2 text-md font-semibold w-full sm:w-auto`;

    return (
        <button
            className={buttonClassName}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            <div className="flex items-center justify-center space-x-2">
                {children}
            </div>
        </button>
    );
};

export default Button;
