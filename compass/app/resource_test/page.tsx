"use client";

import { PageLayout } from "@/components/PageLayout";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import { RowOptionMenu } from "@/components/Table/RowOptionMenu";
import { TestTable } from "@/components/Table/TestIndex";
import TagsInput from "@/components/TagsInput/Index";
import Resource from "@/utils/models/Resource";
import { createClient } from "@/utils/supabase/client";

import { Bars2Icon, BookmarkIcon } from "@heroicons/react/24/solid";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function Page() {
    const [resources, setResources] = useState<Resource[]>([]);
    const columnHelper = createColumnHelper<Resource>();
    
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

    const [data, setData] = useState<Resource[]>([]);

    const deleteUser = (userId: number) => {
        console.log(data);
        setData((currentData) =>
            currentData.filter((user) => user.id !== userId)
        );
    };

    const hideUser = (userId: number) => {
        console.log(`Toggling visibility for user with ID: ${userId}`);
        setData((currentData) => {
            const newData = currentData
                .map((user) => {
                    if (user.id === userId) {
                        return { ...user, visible: !user.visible };
                    }
                    return user;
                })
                .sort((a, b) =>
                    a.visible === b.visible ? 0 : a.visible ? -1 : 1
                );

            console.log(newData);
            return newData;
        });
    };

    const addUser = () => {
        setData([...data]);
    };

    const [presetOptions, setPresetOptions] = useState([
        "administrator",
        "volunteer",
        "employee",
    ]);
    const [tagColors, setTagColors] = useState(new Map());

    const getTagColor = (tag: string) => {
        if (!tagColors.has(tag)) {
            const colors = [
                "bg-cyan-100",
                "bg-blue-100",
                "bg-green-100",
                "bg-yellow-100",
                "bg-purple-100",
            ];
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
            setTagColors(new Map(tagColors).set(tag, randomColor));
        }
        return tagColors.get(tag);
    };

    const handleRowUpdate = (updatedRow: Resource) => {
        const dataIndex = data.findIndex((row) => row.id === updatedRow.id);
        if (dataIndex !== -1) {
            const updatedData = [...data];
            updatedData[dataIndex] = updatedRow;
            setData(updatedData);
        }
    };

    const columns: ColumnDef<Resource, any>[] = [
        columnHelper.display({
            id: "options",
            cell: (props) => (
                <RowOptionMenu
                    onDelete={() => {}}
                    onHide={() => hideUser(props.row.original.id)}
                />
            ),
        }),
        columnHelper.accessor("name", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Name
                </>
            ),
            cell: (info) => (
                <RowOpenAction
                    title={info.getValue()}
                    rowData={info.row.original}
                    onRowUpdate={handleRowUpdate}
                />
            ),
        }),
        columnHelper.accessor("link", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Link
                </>
            ),
            cell: (info) => (
                <a
                    href={info.getValue()}
                    target={"_blank"}
                    className="ml-2 text-gray-500 underline hover:text-gray-400"
                >
                    {info.getValue()}
                </a>
            ),
        }),
        columnHelper.accessor("program", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Program
                </>
            ),
            cell: (info) => (
                <TagsInput presetValue={info.getValue()} />
            ),
        }),

        columnHelper.accessor("summary", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Summary
                </>
            ),
            cell: (info) => (
                <span className="ml-2 text-gray-500">{info.getValue()}</span>
            ),
        }),
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <PageLayout title="Resources" icon={<BookmarkIcon />}>
                <TestTable initialData={resources} columns={columns}/>
            </PageLayout>
        </div>
    );
}
