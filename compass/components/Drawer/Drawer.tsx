import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from "react";
import React, { useState } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import {
    StarIcon as SolidStarIcon,
    EnvelopeIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import {
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    StarIcon as OutlineStarIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import TagsInput from "../TagsInput/Index";

type InputType =
    | "text"
    | "email"
    | "textarea"
    | "select-one"
    | "select-multiple";

export interface Details {
    key: string;
    label: string;
    inputType: InputType;
    icon: ReactNode;
    presetOptionsValues?: string[];
    presetOptionsSetter?: Dispatch<SetStateAction<string[]>>;
}

type DrawerProps = {
    titleKey: string;
    details: Details[];
    rowContent?: any;
    setRowContent?: Dispatch<SetStateAction<any>>;
};

const Drawer: FunctionComponent<DrawerProps> = ({
    titleKey,
    details,
    rowContent,
    setRowContent,
}: DrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [tempRowContent, setTempRowContent] = useState(rowContent);

    const handleTempRowContentChangeHTML = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        handleTempRowContentChange(name, value);
    };

    const handleTempRowContentChange = (name: string, value: any) => {
        setTempRowContent((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEnterPress = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter") {
        }
    };

    const toggleDrawer = () => {
        if (setRowContent && isOpen) {
            setRowContent((prev: any) => {
                return prev.map((row: any) => {
                    if (row.id === tempRowContent.id) {
                        return tempRowContent;
                    }
                    return row;
                });
            });
        }

        setIsOpen(!isOpen);
        if (isFull) {
            setIsFull(!isFull);
        }
        console.log("Send API request to update row content");
    };

    const toggleDrawerFullScreen = () => setIsFull(!isFull);

    const toggleFavorite = () => setIsFavorite(!isFavorite);

    const drawerClassName = `fixed top-0 right-0 w-1/2 h-full bg-white transform ease-in-out duration-300 z-20 ${
        isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
    } ${isFull ? "w-full" : "w-1/2"}`;

    const iconComponent = isFull ? (
        <ArrowsPointingInIcon className="h-5 w-5" />
    ) : (
        <ArrowsPointingOutIcon className="h-5 w-5" />
    );

    const favoriteIcon = isFavorite ? (
        <SolidStarIcon className="h-5 w-5" />
    ) : (
        <OutlineStarIcon className="h-5 w-5" />
    );

    return (
        <div>
            <button
                className={
                    "ml-2 text-xs uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border border-gray-200 bg-white shadow hover:bg-gray-50 p-2 rounded-md"
                }
                onClick={toggleDrawer}
            >
                Open
            </button>
            <div className={drawerClassName}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex flex-row items-center justify-between space-x-2">
                        <span className="h-5 text-purple-200 w-5">
                            <UserIcon />
                        </span>
                        <h2 className="text-lg text-gray-800 font-semibold">
                            {rowContent[titleKey]}
                        </h2>
                    </div>
                    <div>
                        <button
                            onClick={toggleFavorite}
                            className="py-2 text-gray-500 hover:text-gray-800 mr-2"
                        >
                            {favoriteIcon}
                        </button>
                        <button
                            onClick={toggleDrawerFullScreen}
                            className="py-2 text-gray-500 hover:text-gray-800 mr-2"
                        >
                            {iconComponent}
                        </button>
                        <button
                            onClick={toggleDrawer}
                            className="py-2 text-gray-500 hover:text-gray-800"
                        >
                            <ChevronDoubleLeftIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex flex-col space-y-3">
                        {details.map((detail, index) => {
                            const value = tempRowContent[detail.key];
                            let valueToRender = <></>;

                            switch (detail.inputType) {
                                case "select-one":
                                    valueToRender = (
                                        <div className="flex-1">
                                            <div className="rounded-md px-2 py-1">
                                                <TagsInput
                                                    presetValue={
                                                        typeof value ===
                                                        "string"
                                                            ? [value]
                                                            : value || []
                                                    }
                                                    presetOptions={
                                                        detail.presetOptionsValues ||
                                                        []
                                                    }
                                                    setPresetOptions={
                                                        detail.presetOptionsSetter ||
                                                        (() => {})
                                                    }
                                                    singleValue={true}
                                                    onTagsChange={(
                                                        tags: Set<string>
                                                    ) => {
                                                        const tagsArray =
                                                            Array.from(tags);
                                                        handleTempRowContentChange(
                                                            detail.key,
                                                            tagsArray.length > 0
                                                                ? tagsArray[0]
                                                                : null
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                    break;
                                case "select-multiple":
                                    valueToRender = (
                                        <div className="flex-1">
                                            <div className="rounded-md px-2 py-1">
                                                <TagsInput
                                                    presetValue={
                                                        typeof value ===
                                                        "string"
                                                            ? [value]
                                                            : value || []
                                                    }
                                                    presetOptions={
                                                        detail.presetOptionsValues ||
                                                        []
                                                    }
                                                    setPresetOptions={
                                                        detail.presetOptionsSetter ||
                                                        (() => {})
                                                    }
                                                    onTagsChange={(
                                                        tags: Set<string>
                                                    ) => {
                                                        handleTempRowContentChange(
                                                            detail.key,
                                                            Array.from(tags)
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                    break;
                                case "textarea":
                                    valueToRender = (
                                        <div className="flex-1">
                                            <div className="hover:bg-gray-50 rounded-md px-2 py-1">
                                                <textarea
                                                    name={detail.key}
                                                    value={value}
                                                    onChange={
                                                        handleTempRowContentChangeHTML
                                                    }
                                                    onKeyDown={handleEnterPress}
                                                    rows={4}
                                                    onInput={(e) => {
                                                        const target =
                                                            e.target as HTMLTextAreaElement;
                                                        target.style.height =
                                                            "auto";
                                                        target.style.height =
                                                            target.scrollHeight +
                                                            "px";
                                                    }}
                                                    className="w-full p-2 focus:outline-none border border-gray-200 rounded-md resize-none font-normal bg-transparent"
                                                />
                                            </div>
                                        </div>
                                    );
                                    break;
                                case "text":
                                    valueToRender = (
                                        <div className="flex-1">
                                            <div className="hover:bg-gray-50 rounded-md px-2 py-1">
                                                <input
                                                    type={detail.inputType}
                                                    name={detail.key}
                                                    value={value}
                                                    onChange={
                                                        handleTempRowContentChangeHTML
                                                    }
                                                    onKeyDown={handleEnterPress}
                                                    className="w-full p-1 focus:outline-gray-200 bg-transparent"
                                                />
                                            </div>
                                        </div>
                                    );
                                    break;
                                case "email":
                                    valueToRender = (
                                        <div className="flex-1">
                                            <div className="hover:bg-gray-50 rounded-md px-2 py-1">
                                                <input
                                                    type={detail.inputType}
                                                    name={detail.key}
                                                    value={value}
                                                    onChange={
                                                        handleTempRowContentChangeHTML
                                                    }
                                                    onKeyDown={handleEnterPress}
                                                    className="w-full p-1 font-normal hover:text-gray-400 focus:outline-gray-200 underline text-gray-500 bg-transparent"
                                                />
                                            </div>
                                        </div>
                                    );
                                    break;
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex items-center text-xs gap-3"
                                >
                                    <div className="flex items-center text-gray-500">
                                        {detail.icon}
                                    </div>
                                    <div className="w-32">{detail.label}</div>
                                    {valueToRender}
                                </div>
                            );
                        })}
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Drawer;
