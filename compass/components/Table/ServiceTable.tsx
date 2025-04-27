import {
    CheckCircleIcon,
    DocumentTextIcon,
    ListBulletIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import Service from "@/utils/models/Service";
import { Details } from "../Drawer/Drawer";
import { Tag } from "../TagsInput/Tag";
import User from "@/utils/models/User";
import { FilterFn } from "./FilterDropdown";

type ServiceTableProps = {
    data: Service[];
    setData: Dispatch<SetStateAction<Service[]>>;
    user?: User;
};

/**
 * Table componenet used for displaying services
 * @param props.data Stateful list of services to be displayed by the table
 * @param props.setData State setter for the list of services
 */
export default function ServiceTable({
    data,
    setData,
    user,
}: ServiceTableProps) {
    const columnHelper = createColumnHelper<Service>();
    const [requirementsFilterFn, setRequirementsFilterFn] =
        useState<FilterFn>("arrIncludesSome");

    const [programPresets, setProgramPresets] = useState([
        "DOMESTIC",
        "COMMUNITY",
        "ECONOMIC",
    ]);

    const [requirementPresets, setRequirementPresets] = useState([
        "Anonymous",
        "Confidential",
        "Referral required",
        "Safety assessment",
        "Intake required",
        "Income eligibility",
        "Initial assessment",
        "Insurance accepted",
        "Open to parents",
        "18+",
        "Application required",
        "Proof of income",
        "Background check",
        "Enrollment required",
        "Registration required",
        "Parental consent",
        "Age-appropriate",
        "Collaborative",
        "Open to the public",
        "Registration preferred",
        "Legal case",
        "Scheduling required",
        "Limited availability",
        "Eligibility assessment",
        "Pre-registration required",
        "Commitment to attend",
        "Training required",
        "Based on individual needs",
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
                    updateRoute={`/api/service/update?uuid=${user?.uuid}`}
                    isAdmin={user?.role === "ADMIN"}
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
            filterFn: (row, columnId, filterValue) => {
                const rowValue = row.getValue(columnId);
                if (Array.isArray(filterValue)) {
                    return filterValue.includes(rowValue);
                }
                return true;
            },
        }),
        columnHelper.accessor("requirements", {
            header: () => (
                <>
                    <ListBulletIcon className="inline align-top h-4" />{" "}
                    Requirements
                </>
            ),
            cell: (info) => (
                <div className="flex flex-wrap gap-2 items-center p-2">
                    {info.getValue().length > 0 ? (
                        info.getValue().map((tag: string, index: number) => {
                            return <Tag key={index}>{tag}</Tag>;
                        })
                    ) : (
                        <Tag>no requirements</Tag>
                    )}
                </div>
            ),
            filterFn: requirementsFilterFn,
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

    const setFilterFn = (field: string, filterFn: FilterFn) => {
        if (field === "requirements") {
            setRequirementsFilterFn(filterFn);
        }
    };

    return (
        <Table
            data={data}
            setData={setData}
            columns={columns}
            setFilterFn={setFilterFn}
            details={serviceDetails}
            createEndpoint={`/api/service/create?uuid=${user?.uuid}`}
            deleteEndpoint={`/api/service/delete?uuid=${user?.uuid}`}
            isAdmin={user?.role === "ADMIN"}
        />
    );
}
