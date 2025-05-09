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
    updateRoute: string;
};

export function RowOpenAction<T extends DataPoint>({
    title,
    titleKey,
    rowData,
    setData,
    details,
    isAdmin,
    updateRoute,
}: RowOpenActionProps<T>) {
    return (
        <div className="font-semibold group flex flex-row items-center justify-between px-2">
            {title}
            <span>
                <Drawer
                    titleKey={titleKey}
                    rowContent={rowData}
                    details={details}
                    setRowContent={setData}
                    isAdmin={isAdmin}
                    updateRoute={updateRoute}
                />
            </span>
        </div>
    );
}
