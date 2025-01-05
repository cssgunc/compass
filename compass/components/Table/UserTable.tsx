import {
    ArrowDownCircleIcon,
    AtSymbolIcon,
    Bars2Icon,
    EnvelopeIcon,
    ListBulletIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import TagsInput from "@/components/TagsInput/Index";
import User from "@/utils/models/User";
import { Details } from "../Drawer/Drawer";
import { Tag } from "../TagsInput/Tag";

type UserTableProps = {
    data: User[];
    setData: Dispatch<SetStateAction<User[]>>;
    uuid: string;
};

/**
 * Table componenet used for displaying users
 * @param props.data Stateful list of users to be displayed by the table
 * @param props.setData State setter for the list of users
 */
export default function UserTable({ data, setData, uuid }: UserTableProps) {
    const columnHelper = createColumnHelper<User>();

    const [rolePresets, setRolePresets] = useState([
        "ADMIN",
        "VOLUNTEER",
        "EMPLOYEE",
    ]);

    const [programPresets, setProgramPresets] = useState([
        "DOMESTIC",
        "COMMUNITY",
        "ECONOMIC",
    ]);

    const userDetails: Details[] = [
        {
            key: "username",
            label: "username",
            inputType: "text",
            icon: <UserIcon className="h-4 w-4" />,
        },
        {
            key: "role",
            label: "role",
            inputType: "select-one",
            icon: <ListBulletIcon className="h-4 w-4" />,
            presetOptionsValues: rolePresets,
            presetOptionsSetter: setRolePresets,
        },
        {
            key: "email",
            label: "email",
            inputType: "email",
            icon: <EnvelopeIcon className="h-4 w-4" />,
        },
        {
            key: "program",
            label: "program",
            inputType: "select-multiple",
            icon: <ListBulletIcon className="h-4 w-4" />,
            presetOptionsValues: programPresets,
            presetOptionsSetter: setProgramPresets,
        },
    ];

    // Define Tanstack columns
    const columns: ColumnDef<User, any>[] = [
        columnHelper.accessor("username", {
            header: () => (
                <>
                    <UserIcon className="inline align-top h-4" /> Username
                </>
            ),
            cell: (info) => (
                <RowOpenAction
                    title={info.getValue()}
                    titleKey="username"
                    rowData={info.row.original}
                    setData={setData}
                    details={userDetails}
                />
            ),
        }),
        columnHelper.accessor("role", {
            header: () => (
                <>
                    <ListBulletIcon className="inline align-top h-4" /> Role
                </>
            ),
            cell: (info) => (
                <div className="flex flex-wrap gap-2 items-center px-2">
                    <Tag>
                        {info.getValue() && info.getValue().length != 0
                            ? info.getValue()
                            : "no role"}
                    </Tag>
                </div>
            ),
        }),
        columnHelper.accessor("email", {
            header: () => (
                <>
                    <EnvelopeIcon className="inline align-top h-4" /> Email
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
                    <ListBulletIcon className="inline align-top h-4" /> Program
                </>
            ),
            cell: (info) => (
                <div className="flex ml-2 flex-wrap gap-2 items-center">
                    {info.getValue().length > 0 ? (
                        info.getValue().map((tag: string, index: number) => {
                            return <Tag key={index}>{tag}</Tag>;
                        })
                    ) : (
                        <Tag>no programs</Tag>
                    )}
                </div>
            ),
        }),
    ];

    return (
        <Table<User>
            data={data}
            setData={setData}
            columns={columns}
            details={userDetails}
            createEndpoint={`/api/user/create?uuid=${uuid}`}
        />
    );
}
