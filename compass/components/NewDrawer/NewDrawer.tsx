import React, { useState, FunctionComponent } from "react";
import {
    ChevronDoubleLeftIcon,
    StarIcon as SolidStarIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import {
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    StarIcon as OutlineStarIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import TagsInput from "../TagsInput/Index";

type Field = {
    icon: JSX.Element;
    name: JSX.Element;
    input: JSX.Element;
}

type DrawerProps = {
    header: string;
    fields: Field[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function NewDrawer({ header, fields, onSubmit }: DrawerProps)  {
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);
    const toggleDrawerFullScreen = () => setIsFull(!isFull);
    const toggleFavorite = () => setIsFavorite(!isFavorite);

    const drawerClassName = `fixed top-0 right-0 ${
        isFull ? "w-full" : "w-1/2"
    } h-full bg-white transform ease-in-out duration-300 z-20 ${
        isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
    }`;

    return (
        <div>
            <button
                className="ml-2 text-xs uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border border-gray-200 bg-white shadow hover:bg-gray-50 p-2 rounded-md"
                onClick={toggleDrawer}
            >
                Open
            </button>
            <div className={drawerClassName}>
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg text-gray-800 font-semibold">
                        {header}
                    </h2>
                    <div>
                        <button
                            onClick={toggleFavorite}
                            className="py-2 text-gray-500 hover:text-gray-800 mr-2"
                        >
                            {isFavorite ? (
                                <SolidStarIcon className="h-5 w-5" />
                            ) : (
                                <OutlineStarIcon className="h-5 w-5" />
                            )}
                        </button>
                        <button
                            onClick={toggleDrawerFullScreen}
                            className="py-2 text-gray-500 hover:text-gray-800 mr-2"
                        >
                            {isFull ? (
                                <ArrowsPointingInIcon className="h-5 w-5" />
                            ) : (
                                <ArrowsPointingOutIcon className="h-5 w-5" />
                            )}
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
                    <form onSubmit={onSubmit}>
                        <table className="p-4">
                            <tbody className="items-center">
                                {   
                                    fields.map((field, index) => (
                                        <tr className="w-full text-xs items-center flex flex-row justify-between" key={index}>
                                            <div className="flex flex-row space-x-2 text-gray-500 items-center">
                                                <td>{field.icon}</td>
                                                <td className="w-32">{field.name}</td>
                                            </div>
                                            <td className="w-3/4 p-2 pl-0">
                                                {field.input}
                                            </td>
                                        </tr>
                                    ))
                                }
                                <button type="submit">Submit</button>
                            </tbody>
                        </table>
                    </form>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default NewDrawer;
