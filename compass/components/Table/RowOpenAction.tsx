import Drawer from "@/components/page/Drawer";
import {ChangeEvent, useState} from "react";

export const RowOpenAction = ({ title, rowData }) => {
    const [pageContent, setPageContent] = useState("")

    const handleDrawerContentChange = (newContent) => {
      setPageContent(newContent);
    };



  return (
    <div className="font-semibold group flex flex-row items-center justify-between pr-2">
      {title}
      <span >
        <Drawer title="My Drawer Title" editableContent={pageContent} rowContent={rowData} onSave={handleDrawerContentChange}>{pageContent}</Drawer>
    </span>
    </div>
  );
};
