import React from "react";
import {
    HomeIcon,
    ChevronDoubleLeftIcon,
    BookmarkIcon,
    ClipboardIcon,
    BookOpenIcon,
} from "@heroicons/react/24/solid";
import { SidebarItem } from "./SidebarItem";
import { UserProfile } from "../resource/UserProfile";

interface SidebarProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    email: string;
    isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
    setIsSidebarOpen,
    name,
    email,
    isAdmin: admin,
}) => {
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
                    <UserProfile name={name} email={email} />
                </div>
                {/* navigation menu  */}
                <div className="flex flex-col space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500">
                        Pages
                    </h4>
                    <nav className="flex flex-col">
                        {admin && (
                            <SidebarItem
                                icon={<HomeIcon />}
                                text="Admin"
                                active={true}
                                redirect="/admin"
                            />
                        )}

                        <SidebarItem
                            icon={<HomeIcon />}
                            text="Home"
                            active={true}
                            redirect="/resource"
                        />
                        <SidebarItem
                            icon={<BookmarkIcon />}
                            text="Resources"
                            active={true}
                            redirect="/resource"
                        />
                        <SidebarItem
                            icon={<ClipboardIcon />}
                            text="Services"
                            active={true}
                            redirect="/service"
                        />
                        <SidebarItem
                            icon={<BookOpenIcon />}
                            text="Training Manuals"
                            active={true}
                            redirect="/training-manuals"
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
