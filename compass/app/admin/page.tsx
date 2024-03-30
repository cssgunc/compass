// pages/index.tsx
"use client";
import Image from 'next/image';
import Drawer from '@/components/admin/Drawer';
import {ChangeEvent, useState} from "react";


export default function Page()  {
    const [pageContent, setPageContent] = useState("")

    const handleDrawerContentChange = (newContent) => {
      setPageContent(newContent);
    };

    return (
      <div className="min-h-screen flex flex-col">
      <div className="pt-16 px-8 pb-4 flex-grow">
          <div className="mb-4 flex items-center space-x-4">
              <Image
                  src="/logo.png"
                  alt="Compass Center logo"
                  width={25}
                  height={25}
              />
              <h1 className="font-bold text-2xl text-purple-800">Untitled Page</h1>
          </div>
          <Drawer title="Sidebar Component" editableContent={pageContent} onSave={handleDrawerContentChange}>{pageContent}</Drawer>
      </div>
  </div>
    );
};

