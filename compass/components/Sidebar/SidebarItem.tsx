import Link from "next/link";

interface SidebarItemProps {
    icon: React.ReactElement;
    text: string;
    active: boolean;
    redirect: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    text,
    active,
    redirect,
}) => {
    return (
        <Link
            href={redirect}
            className={
                active
                    ? "flex items-center p-2 my-1 space-x-2 bg-gray-200 rounded-md"
                    : "flex items-center p-2 my-1 space-x-2 hover:bg-gray-200 rounded-md"
            }
        >
            <span className="h-5 text-gray-500 w-5">{icon}</span>
            <span className="flex-grow font-medium text-xs text-gray-500">
                {text}
            </span>
        </Link>
    );
};
