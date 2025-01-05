import Drawer, { Details } from "@/components/Drawer/Drawer";
import DataPoint from "@/utils/models/DataPoint";
import {
    EnvelopeIcon,
    ListBulletIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

type RowOpenActionProps<T extends DataPoint> = {
    title: string;
    titleKey: string;
    rowData: T;
    setData: Dispatch<SetStateAction<T[]>>;
    details: Details[];
    isAdmin?: boolean;
};

export function RowOpenAction<T extends DataPoint>({
    title,
    titleKey,
    rowData,
    setData,
    details,
    isAdmin,
}: RowOpenActionProps<T>) {
    return (
        <div className="font-semibold group flex flex-row items-center justify-between pr-2">
            {title}
            <span>
                <Drawer
                    titleKey={titleKey}
                    rowContent={rowData}
                    details={details}
                    setRowContent={setData}
                    isAdmin={isAdmin}
                />
            </span>
        </div>
    );
}
