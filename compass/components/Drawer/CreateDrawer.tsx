import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";
import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import {
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import TagsInput from "../TagsInput/Index";
import { Details } from "./Drawer";

type CreateDrawerProps = {
    details: Details[];
    onCreate: (newItem: any) => void;
};

const CreateDrawer: FunctionComponent<CreateDrawerProps> = ({
    details,
    onCreate,
}: CreateDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [newItemContent, setNewItemContent] = useState<any>({});

    const handleContentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewItemContent((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = () => {
        onCreate(newItemContent);
        setNewItemContent({});
        setIsOpen(false);
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (isFull) {
            setIsFull(!isFull);
        }
    };

    const toggleDrawerFullScreen = () => setIsFull(!isFull);

    const drawerClassName = `fixed top-0 right-0 h-full bg-white transform ease-in-out duration-300 z-20 overflow-y-auto ${
        isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
    } ${isFull ? "w-full" : "w-[600px]"}`;

    const iconComponent = isFull ? (
        <ArrowsPointingInIcon className="h-5 w-5" />
    ) : (
        <ArrowsPointingOutIcon className="h-5 w-5" />
    );

    return (
        <div>
            <button
                className="text-sm text-white font-medium bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md"
                onClick={toggleDrawer}
            >
                Create New
            </button>
            <div className={drawerClassName}>
                <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create New Item
                    </h2>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleDrawerFullScreen}
                            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        >
                            {iconComponent}
                        </button>
                        <button
                            onClick={toggleDrawer}
                            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        >
                            <ChevronDoubleLeftIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex flex-col space-y-4">
                        {details.map((detail, index) => {
                            const value = newItemContent[detail.key] || "";
                            let inputField;

                            switch (detail.inputType) {
                                case "select-one":
                                case "select-multiple":
                                    inputField = (
                                        <TagsInput
                                            presetValue={[]}
                                            presetOptions={
                                                detail.presetOptionsValues || []
                                            }
                                            setPresetOptions={
                                                detail.presetOptionsSetter ||
                                                (() => {})
                                            }
                                        />
                                    );
                                    break;
                                case "textarea":
                                    inputField = (
                                        <textarea
                                            name={detail.key}
                                            value={value}
                                            onChange={handleContentChange}
                                            rows={4}
                                            onInput={(e) => {
                                                const target =
                                                    e.target as HTMLTextAreaElement;
                                                target.style.height = "auto";
                                                target.style.height =
                                                    target.scrollHeight + "px";
                                            }}
                                            className="w-full p-2 focus:outline-none border border-gray-200 rounded-md resize-none font-normal"
                                            placeholder={`Enter ${detail.label.toLowerCase()}...`}
                                        />
                                    );
                                    break;
                                default:
                                    inputField = (
                                        <input
                                            type={detail.inputType}
                                            name={detail.key}
                                            value={value}
                                            onChange={handleContentChange}
                                            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-purple-500"
                                            placeholder={`Enter ${detail.label.toLowerCase()}...`}
                                        />
                                    );
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2"
                                >
                                    <label className="flex items-center text-sm text-gray-700 gap-2">
                                        <span className="text-gray-500">
                                            {detail.icon}
                                        </span>
                                        {detail.label}
                                    </label>
                                    {inputField}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDrawer;
