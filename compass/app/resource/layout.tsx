"use client";

import Sidebar from "@/components/resource/Sidebar";
import React, { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        async function getUser() {
            const { data, error } = await supabase.auth.getUser();

            if (error || data.user === null) {
                router.push("auth/login");
                return;
            }

            setUser(data.user);

            const userData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${data.user.id}`
            );

            console.log(await userData.json());
        }

        getUser();
    }, [router]);

    return (
        <div className="flex-row">
            {/* button to open sidebar */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`fixed z-20 p-2 text-gray-500 hover:text-gray-800 left-0`}
                aria-label={"Open sidebar"}
            >
                {
                    !isSidebarOpen && (
                        <ChevronDoubleRightIcon className="h-5 w-5" />
                    ) // Icon for closing the sidebar
                }
            </button>
            {/* sidebar  */}
            <div
                className={`absolute inset-y-0 left-0 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } w-64 transition duration-300 ease-in-out`}
            >
                <Sidebar
                    name={""}
                    email={(user && user.email) ?? "No email found!"}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
            </div>
            {/* page ui  */}
            <div
                className={`flex-1 transition duration-300 ease-in-out ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}
