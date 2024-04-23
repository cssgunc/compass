import React from "react";
import {
    HomeIcon,
    ChevronDoubleLeftIcon,
    BookmarkIcon,
    ClipboardIcon,
    BookOpenIcon,
} from "@heroicons/react/24/solid";
import { SidebarItem } from "./SidebarItem";
import { UserProfile } from "./UserProfile";

interface SidebarProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
    return (
        <div className="w-64 h-full border border-gray-200 bg-gray-50 px-4">
            {/* button to close sidebar  */}
            <div className="flex justify-end">
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="py-2 text-gray-500 hover:text-gray-800"
                    aria-label="Close sidebar"
                >
                    <ChevronDoubleLeftIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="flex flex-col space-y-8">
                {/* user + logout button  */}
                <div className="flex items-center p-4 space-x-2 border border-gray-200 rounded-md ">
                    <UserProfile />
                </div>
                {/* navigation menu  */}
                <div className="flex flex-col space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500">
                        Pages
                    </h4>
                    <nav className="flex flex-col">
                        <SidebarItem icon={<HomeIcon />} text="Home" />
                        <SidebarItem icon={<BookmarkIcon />} text="Resources" />
                        <SidebarItem icon={<ClipboardIcon />} text="Services" />
                        <SidebarItem
                            icon={<BookOpenIcon />}
                            text="Training Manuals"
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
