import React from "react";

interface ErrorBannerProps {
    heading: string;
    description?: string | null;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
    heading,
    description = null,
}) => {
    return (
        <div
            role="alert"
            className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
            <strong className="block text-sm font-semibold text-red-800">
                {heading}
            </strong>
            {description && (
                <p className="mt-2 text-xs font-thin text-red-700">
                    {description}
                </p>
            )}
        </div>
    );
};

export default ErrorBanner;
