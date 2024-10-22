import Drawer from "@/components/Drawer/Drawer";
import { useState } from "react";
import { DataPoint } from "@/components/Table/Table";

type RowOpenActionProps = {
    title: string,
    rowData: DataPoint,
    onRowUpdate: (updatedRow: DataPoint) => void;
}

export const RowOpenAction = ({ title, rowData, onRowUpdate }: RowOpenActionProps) => {
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
                    onRowUpdate={onRowUpdate}
                >
                    {pageContent}
                </Drawer>
            </span>
        </div>
    );
};
