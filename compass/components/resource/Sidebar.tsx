import React from 'react';
import { ChevronRightIcon, BookmarkIcon, ClipboardIcon, BookOpenIcon } from '@heroicons/react/24/solid';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full border border-gray-200 bg-gray-50 px-4 pt-6 shadow">
      <div className="flex flex-col space-y-8">

        <div className="flex items-center p-4 space-x-2 border border-gray-200 rounded-md ">
          
          <div className="flex flex-col items-start space-y-2">
            <div className="flex flex-col">
                <span className="text-sm text-gray-700 font-bold">Compass Center</span>
                <span className="text-xs text-gray-500">cssgunc@gmail.com</span>
            </div>
            <button className="text-red-600 text-xs hover:underline mt-1">Sign out</button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
        <h4 className="text-xs font-semibold text-gray-500">Pages</h4>
        <nav className="flex flex-col">
          <SidebarItem icon={<BookmarkIcon className="w-4 h-4 text-gray-700" />} text="Resources" />
          <SidebarItem icon={<ClipboardIcon className="w-4 h-4 text-gray-700" />} text="Services" />
          <SidebarItem icon={<BookOpenIcon className="w-4 h-4 text-gray-700" />} text="Training Manuals" />
        </nav>
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactElement;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text }) => {
  return (
    <a href="#" className="flex items-center p-2 space-x-2 hover:bg-gray-200 rounded-md">
      {icon}
      <span className="flex-grow font-semibold text-xs text-gray-700">{text}</span>
    </a>
  );
};

export default Sidebar;