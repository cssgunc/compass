"use client";

import { PageLayout } from "@/components/PageLayout";
import Resource from "@/utils/models/Resource";
import ResourceTable from "@/components/Table/ResourceTable";
import { createClient } from "@/utils/supabase/client";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import User from "@/utils/models/User";

export default function Page() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [currUser, setCurrUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getResources() {
            try {
                setIsLoading(true);
                setError(null);

                const supabase = createClient();
                const { data: userData, error: authError } =
                    await supabase.auth.getUser();

                if (authError) {
                    throw new Error("Authentication failed. Please sign in.");
                }

                // Fetch resources and user data in parallel
                const [resourceResponse, userResponse] = await Promise.all([
                    fetch(`/api/resource/all?uuid=${userData.user.id}`),
                    fetch(`/api/user?uuid=${userData.user.id}`),
                ]);

                // Check for HTTP errors
                if (!resourceResponse.ok) {
                    throw new Error(
                        `Failed to fetch resources: ${resourceResponse.statusText}`
                    );
                }
                if (!userResponse.ok) {
                    throw new Error(
                        `Failed to fetch user data: ${userResponse.statusText}`
                    );
                }

                // Parse the responses
                const [resourcesAPI, currUserData] = await Promise.all([
                    resourceResponse.json(),
                    userResponse.json(),
                ]);

                setResources(resourcesAPI);
                setCurrUser(currUserData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred"
                );
                setResources([]);
                setCurrUser(undefined);
            } finally {
                setIsLoading(false);
            }
        }

        getResources();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <PageLayout title="Resources" icon={<BookmarkIcon />}>
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
                    <ResourceTable
                        data={resources}
                        setData={setResources}
                        user={currUser}
                    />
                )}
            </PageLayout>
        </div>
    );
}
