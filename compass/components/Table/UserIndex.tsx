import { ArrowDownCircleIcon, AtSymbolIcon, Bars2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import TagsInput from "@/components/TagsInput/Index";
import User from "@/utils/models/User";
import { DataPoint } from "@/components/Table/Table";

export default function UserTable({ users }: { users: User[] }) {
    const columnHelper = createColumnHelper<User>();    
    const [data, setData] = useState<DataPoint[]>([...users]);

    const { presetOptions, setPresetOptions, getTagColor } = useTagsHandler([
        "administrator",
        "volunteer",
        "employee",
    ])

    const handleRowUpdate = (updatedRow: DataPoint) => {
        const dataIndex = data.findIndex((row) => row.id === updatedRow.id);
        if (dataIndex !== -1) {
            const updatedData = [...data];
            updatedData[dataIndex] = updatedRow;
            setData(updatedData);
        }
    };

    const columns: ColumnDef<User, any>[] = [
        columnHelper.accessor("username", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Username
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
        columnHelper.accessor("role", {
            header: () => (
                <>
                    <ArrowDownCircleIcon className="inline align-top h-4" />{" "}
                    Role
                </>
            ),
            cell: (info) => (
                <TagsInput
                    presetValue={info.getValue()}
                    presetOptions={presetOptions}
                    setPresetOptions={setPresetOptions}
                    getTagColor={getTagColor}
                />
            ),
        }),
        columnHelper.accessor("email", {
            header: () => (
                <>
                    <AtSymbolIcon className="inline align-top h-4" /> Email
                </>
            ),
            cell: (info) => (
                <span className="ml-2 text-gray-500 underline hover:text-gray-400">
                    {info.getValue()}
                </span>
            ),
        }), 
        columnHelper.accessor("program", {
            header: () => (
                <>
                    <ArrowDownCircleIcon className="inline align-top h-4" />{" "}
                    Program
                </>
            ),
            // TODO: Setup different tags handler for program
            cell: (info) => (
                <TagsInput
                presetValue={info.getValue()}
                presetOptions={presetOptions}
                setPresetOptions={setPresetOptions}
                getTagColor={getTagColor}
            />
            ),
        }),
    ];

    return <Table data={data} setData={setData} columns={columns}/>
}
