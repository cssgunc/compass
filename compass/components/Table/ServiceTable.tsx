import {
    Bars2Icon,
    CheckCircleIcon,
    DocumentTextIcon,
    ListBulletIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import Service from "@/utils/models/Service";
import { Details } from "../Drawer/Drawer";
import { Tag } from "../TagsInput/Tag";

type ServiceTableProps = {
    data: Service[];
    setData: Dispatch<SetStateAction<Service[]>>;
};

/**
 * Table componenet used for displaying services
 * @param props.data Stateful list of services to be displayed by the table
 * @param props.setData State setter for the list of services
 */
export default function ServiceTable({ data, setData }: ServiceTableProps) {
    const columnHelper = createColumnHelper<Service>();

    const [programPresets, setProgramPresets] = useState([
        "domestic",
        "community",
        "economic",
    ]);

    const [requirementPresets, setRequirementPresets] = useState([
        "anonymous",
        "confidential",
        "referral required",
        "safety assessment",
        "intake required",
        "income eligibility",
        "initial assessment",
    ]);

    const serviceDetails: Details[] = [
        {
            key: "name",
            label: "name",
            inputType: "text",
            icon: <UserIcon className="inline align-top h-4" />,
        },
        {
            key: "status",
            label: "status",
            inputType: "text",
            icon: <CheckCircleIcon className="inline align-top h-4" />,
        },
        {
            key: "program",
            label: "program",
            inputType: "select-one",
            icon: <ListBulletIcon className="inline align-top h-4" />,
            presetOptionsValues: programPresets,
            presetOptionsSetter: setProgramPresets,
        },
        {
            key: "requirements",
            label: "requirements",
            inputType: "select-multiple",
            icon: <ListBulletIcon className="inline align-top h-4" />,
            presetOptionsValues: requirementPresets,
            presetOptionsSetter: setRequirementPresets,
        },
        {
            key: "summary",
            label: "summary",
            inputType: "textarea",
            icon: <DocumentTextIcon className="inline align-top h-4" />,
        },
    ];

    // Define Tanstack columns
    const columns: ColumnDef<Service, any>[] = [
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
                    details={serviceDetails}
                />
            ),
        }),
        columnHelper.accessor("status", {
            header: () => (
                <>
                    <CheckCircleIcon className="inline align-top h-4" /> Status
                </>
            ),
            cell: (info) => (
                <span className="text-gray-500 px-2">{info.getValue()}</span>
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
        columnHelper.accessor("requirements", {
            header: () => (
                <>
                    <ListBulletIcon className="inline align-top h-4" />{" "}
                    Requirements
                </>
            ),
            cell: (info) => (
                <div className="flex flex-wrap gap-2 items-center px-2">
                    {info.getValue().length > 0 ? (
                        info.getValue().map((tag: string, index: number) => {
                            return <Tag key={index}>{tag}</Tag>;
                        })
                    ) : (
                        <Tag>no requirements</Tag>
                    )}
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
            details={serviceDetails}
        />
    );
}
