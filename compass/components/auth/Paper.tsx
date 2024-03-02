import React, { ReactNode } from 'react';

interface PageInterface {
    children: ReactNode;
}

const Paper: React.FC<PageInterface> = ({ children }) => {
    return (
        <div className="w-full min-h-screen px-4 py-16 bg-gray-100 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default Paper;