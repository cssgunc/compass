import { Bars2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useTagsHandler from "@/components/TagsInput/TagsHandler";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/Table";
import { RowOpenAction } from "@/components/Table/RowOpenAction";
import TagsInput from "@/components/TagsInput/Index";
import Resource from "@/utils/models/Resource";
import { DataPoint } from "@/components/Table/Table";

export default function ResourceTable({ resources }: { resources: Resource[] }) {
    const columnHelper = createColumnHelper<Resource>();    
    const [data, setData] = useState<DataPoint[]>([...resources]);

    // TODO: Update preset options for resources
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
                <TagsInput
                    presetValue={info.getValue()}
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

    return <Table data={data} setData={setData} columns={columns}/>
}
