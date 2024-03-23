"use client"

import Sidebar from '@/components/resource/Sidebar';
import React, { useState } from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

export default function RootLayout({

    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex-row">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`fixed z-20 p-2 text-gray-500 hover:text-gray-800 left-0`}
                aria-label={'Open sidebar'}
            >
                {!isSidebarOpen &&
                    <ChevronDoubleRightIcon className="h-5 w-5" /> // Icon for closing the sidebar
                }
            </button>

            <div className={`absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 transition duration-300 ease-in-out`}>
                <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className={`flex-1 transition duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {children}
            </div>
        </div>
    )
}