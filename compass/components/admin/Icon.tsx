// components/Icon.tsx

import React from 'react';

interface IconProps {
  svgUrl: string; // Assuming name is used to identify the icon (e.g., icon name or path)
  size?: number; // Optional prop for icon size
  color?: string; // Optional prop for icon color
}

const Icon = ({ svgUrl = "http://www.w3.org/2000/svg", size = 48, color = 'black' }) => {
    // You can add different icon implementations here based on the 'svgUrl' prop
    return (
        <svg
            xmlns={svgUrl}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="3" width="18" height="18" />
        </svg>
    );
};

export default Icon;
