import { ArrowDownCircleIcon, AtSymbolIcon, Bars2Icon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import TagsInput from "@/components/TagsInput/Index";
import User from "@/utils/models/User";

type UserTableProps = {
    data: User[],
    setData: Dispatch<SetStateAction<User[]>>
}

/**
 * Table componenet used for displaying users
 * @param props.users List of users to be displayed by the table
 */
export default function UserTable({ data, setData }: UserTableProps ) {
    const columnHelper = createColumnHelper<User>();

    const { presetOptions, setPresetOptions, getTagColor } = useTagsHandler([
        "administrator",
        "volunteer",
        "employee",
    ])

    const handleRowUpdate = (updatedRow: User) => {
        setData(prevData => (
            prevData.map(row => (
                row.id === updatedRow.id
                ? updatedRow
                : row
            ))
        ))
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
                    setData={setData}
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

    return <Table<User> data={data} setData={setData} columns={columns}/>
}
