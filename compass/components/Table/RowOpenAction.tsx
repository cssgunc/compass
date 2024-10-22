import Drawer from "@/components/Drawer/Drawer";
import { ChangeEvent, useState } from "react";

export const RowOpenAction = ({ title, rowData, onRowUpdate }) => {
    const [pageContent, setPageContent] = useState("");

    const handleDrawerContentChange = (newContent) => {
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
