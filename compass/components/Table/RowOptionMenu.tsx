//delete, duplicate, open
import {
    TrashIcon,
    DocumentDuplicateIcon,
    ArrowUpRightIcon,
    EllipsisVerticalIcon,
    EyeSlashIcon,
    EyeIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import { useState, useEffect, useRef } from "react";
import { RowOption } from "./RowOption";

interface RowOptionMenuProps {
    onDelete?: () => void;
    onHide: () => void;
    visible: boolean;
}

export const RowOptionMenu = ({
    onDelete,
    onHide,
    visible,
}: RowOptionMenuProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                className="items-end"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <EllipsisVerticalIcon className="h-4" />
            </button>
            <div
                ref={menuRef}
                className={
                    "justify-start border border-gray-200 shadow-lg flex flex-col absolute bg-white w-auto p-2 rounded [&>*]:rounded z-10" +
                    (!menuOpen ? " invisible" : "")
                }
            >
                {onDelete && (
                    <RowOption
                        icon={TrashIcon}
                        label="Delete"
                        onClick={onDelete}
                    />
                )}
                {/* <RowOption
                    icon={ArrowUpRightIcon}
                    label="Open"
                    onClick={() => {}}
                /> */}
                <RowOption
                    icon={visible ? EyeSlashIcon : EyeIcon}
                    label={visible ? "Hide" : "Show"}
                    onClick={onHide}
                />
            </div>
        </>
    );
};
