"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                            isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        } w-64 transition duration-300 ease-in-out`}
                    >
                        <Sidebar
                            name={user.username}
                            email={user.email}
                            setIsSidebarOpen={setIsSidebarOpen}
                            isAdmin={user.role === Role.ADMIN}
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
            ) : (
                <Loading />
            )}
        </div>
    );
}
