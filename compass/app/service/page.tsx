"use client";

import { PageLayout } from "@/components/PageLayout";
import ServiceTable from "@/components/Table/ServiceTable";
import Service from "@/utils/models/Service";
import User from "@/utils/models/User";
import { createClient } from "@/utils/supabase/client";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [services, setServices] = useState<Service[]>([]);
    const [currUser, setCurrUser] = useState<User | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getServices() {
            try {
                setIsLoading(true);
                setError(null);

                const supabase = createClient();
                const { data: userData, error: authError } =
                    await supabase.auth.getUser();

                if (authError) {
                    throw new Error("Authentication failed. Please sign in.");
                }

                // Fetch services and user data in parallel
                const [serviceResponse, userResponse] = await Promise.all([
                    fetch(`/api/service/all?uuid=${userData.user.id}`),
                    fetch(`/api/user?uuid=${userData.user.id}`),
                ]);

                // Check for HTTP errors
                if (!serviceResponse.ok) {
                    throw new Error(
                        `Failed to fetch services: ${serviceResponse.statusText}`
                    );
                }
                if (!userResponse.ok) {
                    throw new Error(
                        `Failed to fetch user data: ${userResponse.statusText}`
                    );
                }

                // Parse the responses
                const [servicesAPI, currUserData] = await Promise.all([
                    serviceResponse.json(),
                    userResponse.json(),
                ]);

                setCurrUser(currUserData);
                setServices(servicesAPI);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unexpected error occurred"
                );
                setServices([]);
                setCurrUser(undefined);
            } finally {
                setIsLoading(false);
            }
        }

        getServices();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <PageLayout title="Services" icon={<ClipboardIcon />}>
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
                    <ServiceTable
                        data={services}
                        setData={setServices}
                        user={currUser}
                    />
                )}
            </PageLayout>
        </div>
    );
}
