
"use client";
import { useState } from 'react';
import { PageLayout } from '@/components/admin/PageLayout';
import Sidebar from '@/components/resource/Sidebar';
import Icon from '@/components/admin/Icon';
import Page from '../page';
import TableTemp from '@/components/admin/TableTemp';

export default function LayoutPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

    return (
        <div className="flex">
            <div className={`sidebar-container ${isSidebarVisible ? 'sidebar-open' : 'sidebar-closed'}`}>
                <Sidebar setIsSidebarOpen={setIsSidebarVisible} isSidebarVisible={isSidebarVisible} />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <PageLayout
                    icon={<Icon />} // Replace with your icon component
                    title="Your Page Title"
                    table={<TableTemp />} // Replace with your table component
                />
            </div>
        </div>
    );
}
