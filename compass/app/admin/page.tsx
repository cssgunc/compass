
"use client";
import { useState } from 'react';
import { PageLayout } from '@/components/admin/PageLayout';
import Sidebar from '@/components/resource/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import Page from '../page';

export default function LayoutPage() {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

    const sidebarVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 1, x: '-50%' },
      };

    return (
        <div className="flex">
        {(
            <div
            className={`sidebar-container ${isSidebarVisible ? 'sidebar-open' : 'sidebar-closed'}`}
            >
            <Sidebar setIsSidebarOpen={setIsSidebarVisible} isSidebarVisible={isSidebarVisible} />
            </div>
        )}
        </div>
      );
}
