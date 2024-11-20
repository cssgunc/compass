import { Dispatch, SetStateAction, useState } from "react";
import NewResourceDrawer from "../NewDrawer/NewResourceDrawer";
import Resource from "@/utils/models/Resource";

type RowOpenActionProps = {
    title: string;
    rowData: Resource;
    setData: Dispatch<SetStateAction<Resource[]>>;
};

export default function ResourceRowOpenAction({
    title,
    rowData,
    setData,
}: RowOpenActionProps) {
    return (
        <div className="font-semibold group flex flex-row items-center justify-between pr-2">
            {title}
            <span>
                <NewResourceDrawer
                    rowContent={rowData}
                    updateData={(i) => {alert(JSON.stringify(i))}}
                />
            </span>
        </div>
    );
}