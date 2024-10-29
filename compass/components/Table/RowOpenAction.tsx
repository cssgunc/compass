import Drawer from "@/components/Drawer/Drawer";
import DataPoint from "@/utils/models/DataPoint";
import { Dispatch, SetStateAction, useState } from "react";

type RowOpenActionProps<T extends DataPoint> = {
    title: string,
    rowData: T,
    setData: Dispatch<SetStateAction<T[]>>
}

export function RowOpenAction<T extends DataPoint>({ title, rowData, setData }: RowOpenActionProps<T>) {
    const [pageContent, setPageContent] = useState("");

    const handleDrawerContentChange = (newContent: string) => {
        setPageContent(newContent);
    };

    return (
        <div className="font-semibold group flex flex-row items-center justify-between pr-2">
            {title}
            <span>
                {/* Added OnRowUpdate to drawer */}
                <Drawer
                    title="My Drawer Title"
                    editableContent={pageContent}
                    rowContent={rowData}
                    onSave={handleDrawerContentChange}
                    setData={setData}
                >
                    {pageContent}
                </Drawer>
            </span>
        </div>
    );
};
