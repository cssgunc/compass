import { FunctionComponent, ReactElement, ReactNode } from 'react';
import React, { useState } from 'react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon, XMarkIcon, StarIcon as SolidStarIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, StarIcon as OutlineStarIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Card from '@/components/page/Card'
import { Row } from '@tanstack/react-table';



type DrawerProps = {
    title: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset"; // specify possible values for type
    disabled?: boolean;
    editableContent?: any;
    onSave?: (content: any) => void;
    row: Row<any>;
    // onRowUpdate?: (content: any) => void;
};

interface EditContent {
    content: string;
    isEditing: boolean;
}


const Drawer: FunctionComponent<DrawerProps> = ({ title, children, onSave, editableContent, row }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [currentCardIcon, setCurrentCardIcon] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState(false);
    // const [tempRowContent, setTempRowContent] = useState(rowContent);

    // const handleTempRowContentChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name);
    //     console.log(value);
    //     setTempRowContent((prevContent) => ({
    //         ...prevContent,
    //         [name]: value,
    //     }));
    // };

    // const handleEnterPress = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         // Update the rowContent with the temporaryRowContent
    //         if (onRowUpdate) {
    //             onRowUpdate(tempRowContent);
    //         }
    //     }
    // };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (isFull) {
            setIsFull(!isFull);
        }
    }

    const toggleDrawerFullScreen = () => setIsFull(!isFull);

    const toggleFavorite = () => setIsFavorite(!isFavorite);

    const drawerClassName = `fixed top-0 right-0 w-1/2 h-full bg-white transform ease-in-out duration-300 z-20 ${isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"

        } ${isFull ? "w-full" : "w-1/2"}`;

    const iconComponent = isFull ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />;

    const favoriteIcon = isFavorite ? <SolidStarIcon className="h-5 w-5" /> : <OutlineStarIcon className="h-5 w-5" />


    return (
        <div>
            <button className={"ml-2 uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border border-gray-200 bg-white shadow hover:bg-gray-50 p-2 rounded-md"} onClick={toggleDrawer}>Open</button>
            <div className={drawerClassName}></div>
            <div className={drawerClassName}>
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex flex-row items-center justify-between space-x-2">
                        <span className="h-5 text-purple-700 w-5">{currentCardIcon}</span>
                        <h2 style={{ fontSize: '20px' }} className="text-sm text-gray-800 font-semibold">{row.getValue("username")}</h2>
                    </div>
                    <div>
                        <button onClick={toggleFavorite} className="py-2 text-gray-500 hover:text-gray-800 mr-2">
                            {favoriteIcon}
                        </button>
                        <button onClick={toggleDrawerFullScreen} className="py-2 text-gray-500 hover:text-gray-800 mr-2">
                            {iconComponent}
                        </button>
                        <button onClick={toggleDrawer} className="py-2 text-gray-500 hover:text-gray-800">
                            <ChevronDoubleLeftIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <table className="p-4">
                        <tbody>
                            {["username", "role", "email", "program"].map((value, i) =>
                                <Property key={i} Icon={EnvelopeIcon} value={value} row={row}/>
                            ) }
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
        </div>
    );
};

const Property = ({Icon, value, row}) => {
    return (<tr className="w-full text-sm items-center flex flex-row justify-between">
        <div className="flex flex-row space-x-2 text-gray-500">
            <td className="w-20"><Icon className="inline h-4"/> {value}</td>
        </div>
        <td className="w-3/4">
            <input
                type="text"
                name="email"
                value={row.getValue(value)}
                className="w-full p-1 focus:outline-gray-200  hover:bg-gray-50"
            /></td>
    </tr>);
}

export default Drawer;

