import ResourceDrawer from "@/components/ResourceDrawer/page";
import { ChangeEvent, useState } from "react";

export const ResourceRowOpenAction = ({ title, rowData, onRowUpdate }) => {
    const [pageContent, setPageContent] = useState("");

    const handleDrawerContentChange = (newContent) => {
        setPageContent(newContent);
    };

    return (
        <div className="font-semibold group flex flex-row items-center justify-between pr-2">
            {title}
            <span>
                {/* Added OnRowUpdate to drawer */}
                <ResourceDrawer
                    title="My Drawer Title"
                    editableContent={pageContent}
                    rowContent={rowData}
                    onSave={handleDrawerContentChange}
                    onRowUpdate={onRowUpdate}
                >
                    {pageContent}
                </ResourceDrawer>
            </span>
        </div>
    );
};
