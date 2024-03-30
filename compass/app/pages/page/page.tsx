// pages/index.tsx
"use client";
import Image from 'next/image';



import Drawer from '@/components/page/Drawer';
// import { Metadata } from 'next'
import {ChangeEvent, useState} from "react";

// export const metadata: Metadata = {
//   title: 'Login',
// }

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
                  src="/logo.png" // Ensure the path to your logo is correct
                  alt="Compass Center logo"
                  width={25}
                  height={25}
                  // If you are using TypeScript and Next.js Image component, ensure you have set up 'next/image' in your 'next.config.js' for static import
              />
              <h1 className="font-bold text-2xl text-purple-800">Untitled Page</h1>
          </div>
          <Drawer title="Sidebar Component" editableContent={pageContent} onSave={handleDrawerContentChange}>{pageContent}</Drawer>
      </div>
  </div>
    );
};

