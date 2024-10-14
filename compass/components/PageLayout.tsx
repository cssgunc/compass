interface PageLayoutProps {
    icon: React.ReactElement;
    title: string;
    children: React.ReactElement;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
    icon,
    title,
    children,
}) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <div className="pt-16 px-8 pb-4 flex-row">
                <div className="mb-4 flex items-center space-x-4">
                    <span className="w-6 h-6 text-purple-200">{icon}</span>
                    <h1 className="font-bold text-2xl text-purple-800">
                        {title}
                    </h1>
                </div>
            </div>
            {/* data  */}
            <div className="px-8 py-8">{children}</div>
        </div>
    );
};
