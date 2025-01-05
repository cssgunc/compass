"use client";

import { PageLayout } from "@/components/PageLayout";
import UserTable from "@/components/Table/UserTable";
import User from "@/utils/models/User";
import { createClient } from "@/utils/supabase/client";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [currUser, setCurrUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUsers() {
            try {
                setIsLoading(true);
                setError(null);

                const supabase = createClient();
                const { data: userData, error: authError } =
                    await supabase.auth.getUser();

                if (authError) {
                    throw new Error("Authentication failed. Please sign in.");
                }

                // Fetch users list and current user data in parallel
                const [usersResponse, userResponse] = await Promise.all([
                    fetch(`/api/user/all?uuid=${userData.user.id}`),
                    fetch(`/api/user?uuid=${userData.user.id}`),
                ]);

                // Check for HTTP errors
                if (!usersResponse.ok) {
                    throw new Error(
                        `Failed to fetch users: ${usersResponse.statusText}`
                    );
                }
                if (!userResponse.ok) {
                    throw new Error(
                        `Failed to fetch user data: ${userResponse.statusText}`
                    );
                }

                // Parse the responses
                const [usersAPI, currUserData] = await Promise.all([
                    usersResponse.json(),
                    userResponse.json(),
                ]);

                // Verify admin status
                if (currUserData.role !== "ADMIN") {
                    throw new Error("Unauthorized: Admin access required");
                }

                setUsers(usersAPI);
                setCurrUser(currUserData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred"
                );
                setUsers([]);
                setCurrUser(undefined);
            } finally {
                setIsLoading(false);
            }
        }

        getUsers();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <PageLayout title="Users" icon={<UsersIcon />}>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-purple-700" />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-500 text-center">
                            <p className="text-lg font-semibold">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                ) : (
                    <UserTable
                        data={users}
                        setData={setUsers}
                        user={currUser}
                    />
                )}
            </PageLayout>
        </div>
    );
}
