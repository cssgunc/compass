//delete, duplicate, open
import Drawer from "../page/Drawer";
import { TrashIcon, DocumentDuplicateIcon, ArrowUpRightIcon, EllipsisVerticalIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import { useState, useEffect, useRef } from "react";
import { RowOption } from "./RowOption";

export const RowOptionMenu = ( { onDelete, onHide } ) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const [pageContent, setPageContent] = useState("");
  const handleDrawerContentChange = (newContent) => {
    setPageContent(newContent);
  };
  // TODO: Hide menu if clicked elsewhere

  return (
    <>
    <button className="align-center" onClick={() => setMenuOpen(!menuOpen)}><EllipsisVerticalIcon className="h-4"/></button>
    <div
      className={"justify-start border border-gray-200 shadow-lg flex flex-col absolute bg-white w-auto p-2 rounded [&>*]:rounded z-10" + (!menuOpen ? " invisible" : "")}
    >
      <RowOption icon={TrashIcon} label="Delete" onClick={onDelete} />
        <RowOption icon={ArrowUpRightIcon} label="Open"  />
        <RowOption icon={EyeSlashIcon} label="Hide" onClick={ onHide } />
      </div>
</>
  );
}
