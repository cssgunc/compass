"use client";

import { PageLayout } from "@/components/PageLayout";
import UserTable from "@/components/Table/UserTable";
import User from "@/utils/models/User";
import { createClient } from "@/utils/supabase/client";

import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);
    const [uuid, setUuid] = useState<string>("");

    useEffect(() => {
        async function getUser() {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.log("Accessed admin page but not logged in");
                return;
            }

            setUuid(data.user.id);

            const userListData = await fetch(
                `/api/user/all?uuid=${data.user.id}`
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
                {/* TODO: REPLACE UUID WITH HTTP BEARER TOKEN */}
                <UserTable data={users} setData={setUsers} uuid={uuid} />
            </PageLayout>
        </div>
    );
}
