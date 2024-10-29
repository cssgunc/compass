"use client";

import { PageLayout } from "@/components/PageLayout";
import ServiceTable from "@/components/Table/ServiceTable";
import Service from "@/utils/models/Service";
import { createClient } from "@/utils/supabase/client";

import { ClipboardIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        async function getServices() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Accessed admin page but not logged in");
                return;
            }

            const serviceListData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/service/all?uuid=${data.user.id}`
            );

            const servicesAPI: Service[] = await serviceListData.json();
            setServices(servicesAPI);
        }

        getServices();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <PageLayout title="Services" icon={<ClipboardIcon />}>
                <ServiceTable data={services} setData={setServices} />
            </PageLayout>
        </div>
    );
}
