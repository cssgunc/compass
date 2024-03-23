import React, { ReactNode } from 'react';

interface Link {
  href?: string;
  children: ReactNode;
}

const InlineLink: React.FC<Link> = ({href = '#', children}) => {
    return (
        <a href={href} className='text-sm text-purple-600 hover:underline font-semibold italic'>
            {children}
        </a>
    )
}

export default InlineLink;