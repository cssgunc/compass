"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import User, { Role } from "@/utils/models/User";
import Loading from "@/components/auth/Loading";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        async function getUser() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            console.log(data, error);

            if (error) {
                console.log("Accessed admin page but not logged in");
                router.push("/auth/login");
                return;
            }

            const userData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${data.user.id}`
            );

            const user: User = await userData.json();

            if (user.role !== Role.ADMIN) {
                console.log(
                    `Accessed admin page but incorrect permissions: ${user.username} ${user.role}`
                );
                router.push("/home");
                return;
            }

            setUser(user);
        }

        getUser();
    }, [router]);

    return (
        <div className="flex-row">
            {user ? (
                <div>
                    <Sidebar
                        setIsSidebarOpen={setIsSidebarOpen}
                        isSidebarOpen={isSidebarOpen}
                        name={user.username}
                        email={user.email}
                        isAdmin={user.role === Role.ADMIN}
                    />
                    <div
                        className={`flex-1 transition duration-300 ease-in-out ${
                            isSidebarOpen ? "ml-64" : "ml-0"
                        }`}
                    >
                        {children}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
