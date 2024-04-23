interface SidebarItemProps {
    icon: React.ReactElement;
    text: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
    return (
        <a
            href="#"
            className="flex items-center p-2 space-x-2 hover:bg-gray-200 rounded-md"
        >
            <span className="h-5 text-gray-500 w-5">{icon}</span>
            <span className="flex-grow font-medium text-xs text-gray-500">
                {text}
            </span>
        </a>
    );
};
