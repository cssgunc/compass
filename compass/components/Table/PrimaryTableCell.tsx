/* An extension of TableCell.tsx that includes an "open" button and the drawer.
For cells in the "primary" (or first) column of the table. */
import Drawer from "@/components/page/Drawer";
import { TableCell } from "./TableCell";
import { SetStateAction, useState } from "react";

export const PrimaryTableCell = ({ getValue, row, column, table }) => {
  const [pageContent, setPageContent] = useState("")

  const handleDrawerContentChange = (newContent: SetStateAction<string>) => {
    setPageContent(newContent);
  };

  return (
    <div className="font-semibold group flex flex-row items-center justify-between pr-2">
      <TableCell getValue={getValue} row={row} column={column} table={table} />
      <span>
        <Drawer title={getValue()} editableContent={pageContent} onSave={handleDrawerContentChange}>{pageContent}</Drawer>
      </span>
    </div>
  );
};
