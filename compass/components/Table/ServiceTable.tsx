import { Bars2Icon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import TagsInput from "@/components/TagsInput/Index";
import Service from "@/utils/models/Service";

type ServiceTableProps = {
    data: Service[],
    setData: Dispatch<SetStateAction<Service[]>>
}

/**
 * Table componenet used for displaying services
 * @param props.data Stateful list of services to be displayed by the table
 * @param props.setData State setter for the list of services
 */
export default function ServiceTable({ data, setData }: ServiceTableProps ) {
    const columnHelper = createColumnHelper<Service>();
    
    // TODO: Update preset options for services
    const { presetOptions, setPresetOptions, getTagColor } = useTagsHandler([
        "administrator",
        "volunteer",
        "employee",
    ])

    const columns: ColumnDef<Service, any>[] = [
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
                    setData={setData}
                />
            ),
        }),
        columnHelper.accessor("status", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Status
                </>
            ),
            cell: (info) => (
                <span className="ml-2 text-gray-500">{info.getValue()}</span>
            ),
        }),
        columnHelper.accessor("program", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Program
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
        columnHelper.accessor("requirements", {
            header: () => (
                <>
                    <Bars2Icon className="inline align-top h-4" /> Requirements
                </>
            ),
            cell: (info) => (
                // TODO: Setup different tag handler for requirements
                <TagsInput
                    presetValue={info.getValue()[0] !== "" ? info.getValue() : ["N/A"]}
                    presetOptions={presetOptions}
                    setPresetOptions={setPresetOptions} 
                    getTagColor={getTagColor} 
                />
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

    return <Table data={data} setData={setData} columns={columns} />
};
