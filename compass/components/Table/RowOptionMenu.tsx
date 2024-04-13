//delete, duplicate, open
import { TrashIcon, DocumentDuplicateIcon, ArrowUpRightIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";


export const RowOptionMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);


  // TODO: Hide menu if clicked elsewhere

  return (
    <>
    <button className="align-center" onClick={() => setMenuOpen(!menuOpen)}><EllipsisVerticalIcon className="h-4"/></button>
    <div
      className={"absolute text-left bg-white w-auto p-1 rounded [&>*]:p-1 [&>*]:px-5 [&>*]:rounded" + (!menuOpen ? " invisible" : "")}
    >
      <div className="hover:bg-gray-100"><TrashIcon className="inline h-4"/> Delete</div>
      <div className="hover:bg-gray-100"><DocumentDuplicateIcon className="inline h-4"/> Duplicate</div>
      <div className="hover:bg-gray-100"><ArrowUpRightIcon className="inline h-4"/> Open</div>
    </div>
    </>
  );
}
