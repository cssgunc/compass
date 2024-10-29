"use client";

import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table/Index"  
import User from "@/utils/models/User";
import { createClient } from "@/utils/supabase/client";

import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function getUser() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Accessed admin page but not logged in");
                return;
            }

            const userListData = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/user/all?uuid=${data.user.id}`
            );

            const users: User[] = await userListData.json();

            setUsers(users);
        }

        getUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <PageLayout title="Users" icon={<UsersIcon />}>
                <Table users={users} />
            </PageLayout>
        </div>
    );
}
