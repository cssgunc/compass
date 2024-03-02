import { FunctionComponent, ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: FunctionComponent<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
        // className="px-4 py-2 font-bold text-white bg-purple-600 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-opacity-var focus:ring-color-var"
        className="inline-block rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-semibold text-white hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-purple-500"
        onClick={onClick}
        // style={{
        //   '--ring-opacity-var': `var(--ring-opacity)`,
        //   '--ring-color-var': `rgba(var(--ring-color), var(--ring-opacity))`
        // }}
        >
            {children}
        </button>
    );
};
export default Button;
