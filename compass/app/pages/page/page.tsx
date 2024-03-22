// pages/index.tsx
"use client";


import Drawer from '@/components/page/Drawer';
// import { Metadata } from 'next'
import {ChangeEvent, useState} from "react";

// export const metadata: Metadata = {
//   title: 'Login',
// }

export default function Page()  {
    return (
      <>
    <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">Resources</h1>
    <Drawer title="My Drawer Title">hi</Drawer>
      </>
    );
};