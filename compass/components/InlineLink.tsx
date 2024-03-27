import React, { ReactNode } from 'react';

interface Link {
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    href?: string;
    children: ReactNode;
}

const InlineLink: React.FC<Link> = ({href = '#', children, onClick}) => {
    return (
        <a 
        onClick={onClick}
        href={href} 
        className="text-sm text-purple-600 hover:underline font-semibold"
    >
        {children}
    </a>
    )
}

export default InlineLink;