import { Bars2Icon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import Table from "@/components/Table/Table";
import TagsInput from "@/components/TagsInput/Index";
import Resource from "@/utils/models/Resource";

type ResourceTableProps = {
    data: Resource[],
    setData: Dispatch<SetStateAction<Resource[]>>
}

/**
 * Table componenet used for displaying resources
 * @param props.data Stateful list of resources to be displayed by the table
 * @param props.setData State setter for the list of resources
 */
export default function ResourceTable({ data, setData }: ResourceTableProps ) {
    const columnHelper = createColumnHelper<Resource>();    

    // Set up tag handling
    const programProps = useTagsHandler([
        "community",
        "domestic",
        "economic",
    ])

    // Define Tanstack columns
    const columns: ColumnDef<Resource, any>[] = [
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
                <TagsInput
                    presetValue={info.getValue()}
                    {...programProps}
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

    return <Table data={data} setData={setData} columns={columns}/>
}
