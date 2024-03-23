"use client"

import Sidebar from '@/components/resource/Sidebar';
import React, { useState } from 'react';

export default function RootLayout({

    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex-row">
            <div className={`absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 transition duration-300 ease-in-out`}>
                <Sidebar />
            </div>
            <div className={`flex-1 transition duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {children}
            </div>
        </div>
    )
}