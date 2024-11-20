import Drawer from "@/components/Drawer/Drawer";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

type NewDrawerButtonProps = {
    title?: string;
    setData: Dispatch<SetStateAction<any>>;
};

export function NewDrawerButton({ title = "New", setData }: NewDrawerButtonProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <button
                className="flex items-center text-gray-500 hover:text-gray-700 font-medium border border-gray-200 bg-white shadow-sm hover:bg-gray-50 p-2 rounded-md"
                onClick={handleOpenDrawer}
            >
                <PlusIcon className="inline h-4 mr-1" />
                {title}
            </button>
            {isDrawerOpen && (
                <Drawer
                    title="Add New Data"
                    rowContent={{}}
                    setData={setData}
                    onSave={handleCloseDrawer}
                >
                    <p className="p-4 text-gray-600">Drawer content goes here...</p>
                </Drawer>
            )}
        </>
    );
}

