import {
    Bars2Icon,
    DocumentTextIcon,
    LinkIcon,
    ListBulletIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import Table from "@/components/Table/Table";
import TagsInput from "@/components/TagsInput/Index";
import Resource from "@/utils/models/Resource";
import { Details } from "../Drawer/Drawer";
import { Tag } from "../TagsInput/Tag";

type ResourceTableProps = {
    data: Resource[];
    setData: Dispatch<SetStateAction<Resource[]>>;
};

/**
 * Table componenet used for displaying resources
 * @param props.data Stateful list of resources to be displayed by the table
 * @param props.setData State setter for the list of resources
 */
export default function ResourceTable({ data, setData }: ResourceTableProps) {
    const columnHelper = createColumnHelper<Resource>();

    const [programPresets, setProgramPresets] = useState([
        "domestic",
        "community",
        "economic",
    ]);

    const resourceDetails: Details[] = [
        {
            key: "name",
            label: "name",
            inputType: "text",
            icon: <UserIcon className="h-4 w-4" />,
        },
        {
            key: "link",
            label: "link",
            inputType: "email",
            icon: <LinkIcon className="h-4 w-4" />,
        },
        {
            key: "program",
            label: "program",
            inputType: "select-one",
            icon: <ListBulletIcon className="h-4 w-4" />,
            presetOptionsValues: programPresets,
            presetOptionsSetter: setProgramPresets,
        },
        {
            key: "summary",
            label: "summary",
            inputType: "textarea",
            icon: <DocumentTextIcon className="h-4 w-4" />,
        },
    ];
    // Define Tanstack columns
    const columns: ColumnDef<Resource, any>[] = [
        columnHelper.accessor("name", {
            header: () => (
                <>
                    <UserIcon className="inline align-top h-4" /> Name
                </>
            ),
            cell: (info) => (
                <RowOpenAction
                    title={info.getValue()}
                    titleKey="name"
                    rowData={info.row.original}
                    setData={setData}
                    details={resourceDetails}
                />
            ),
        }),
        columnHelper.accessor("link", {
            header: () => (
                <>
                    <LinkIcon className="inline align-top h-4" /> Link
                </>
            ),
            cell: (info) => (
                <div className="flex items-start gap-2 px-2">
                    <a
                        href={info.getValue()}
                        target="_blank"
                        className="text-gray-500 underline hover:text-gray-400 break-all"
                    >
                        {info.getValue()}
                    </a>
                </div>
            ),
        }),
        columnHelper.accessor("program", {
            header: () => (
                <>
                    <ListBulletIcon className="inline align-top h-4" /> Program
                </>
            ),
            cell: (info) => (
                <div className="flex flex-wrap gap-2 items-center px-2">
                    <Tag>
                        {info.getValue().length != 0
                            ? info.getValue()
                            : "no program"}
                    </Tag>
                </div>
            ),
        }),
        columnHelper.accessor("summary", {
            header: () => (
                <>
                    <DocumentTextIcon className="inline align-top h-4" />{" "}
                    Summary
                </>
            ),
            cell: (info) => (
                <div className="flex items-start gap-2 px-2 py-1">
                    <span className="text-gray-500 max-h-8 overflow-y-auto">
                        {info.getValue()}
                    </span>
                </div>
            ),
        }),
    ];

    return (
        <Table
            data={data}
            setData={setData}
            columns={columns}
            details={resourceDetails}
        />
    );
}
