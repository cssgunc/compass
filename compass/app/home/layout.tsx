"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import User, { Role } from "@/utils/models/User";
import Loading from "@/components/auth/Loading";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            console.log(data, error);

            if (error) {
                console.log("Accessed home page but not logged in");
                router.push("/auth/login");
                return;
            }

            const userData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${data.user.id}`
            );

            setUser(await userData.json());
        }

        getUser();
    }, [router]);

    return (
        <div className="flex-row">
            {user ? (
                <div>
                    <Sidebar
                        name={user.username}
                        email={user.email}
                        setIsSidebarOpen={setIsSidebarOpen}
                        isSidebarOpen={isSidebarOpen}
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
