"use client";

import { PageLayout } from "@/components/PageLayout";
import { ResourceTable } from "@/components/Table/ResourceIndex";
import Resource from "@/utils/models/Resource";
import { createClient } from "@/utils/supabase/client";

import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [resources, setResources] = useState<Resource[]>([]);

    useEffect(() => {
        async function getResources() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Accessed admin page but not logged in");
                return;
            }

            const userListData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/resource/all?uuid=${data.user.id}`
            );

            const resourcesAPI: Resource[] = await userListData.json();

            setResources(resourcesAPI);
        }

        getResources();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <PageLayout title="Resources" icon={<BookmarkIcon />}>
                <ResourceTable users={resources} />
            </PageLayout>
        </div>
    );
}
