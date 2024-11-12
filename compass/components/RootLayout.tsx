"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import User, { Role } from "@/utils/models/User";
import Loading from "@/components/auth/Loading";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<User | null>(null); // Initialize user as null
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error || !data?.user) {
                console.log("User not logged in or error fetching user");
                router.push("/auth/login");
                return;
            }

            const userData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${data.user.id}`
            );

            const user: User = await userData.json();
            setUser(user);  // Set user data after fetching
        }

        getUser();
    }, [router]);

    if (!user) {
        return <Loading />; // Show loading screen while the user is being fetched
    }

    return (
        <div className="flex">
            {/* Sidebar is shared across all pages */}
            <Sidebar
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
                name={user.username}
                email={user.email}
                isAdmin={user.role === Role.ADMIN}
            />

            {/* Page content */}
            <div
                className={`flex-1 transition duration-300 ease-in-out ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                }`}
            >
                {children} {/* Render page-specific content here */}
            </div>
        </div>
    );
}
