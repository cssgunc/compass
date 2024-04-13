import { FunctionComponent, ReactElement, ReactNode } from 'react';
import React, { useState } from 'react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon, XMarkIcon, StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon, StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import Card from '@/components/page/Card'



type DrawerProps = {
    title: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset"; // specify possible values for type
    disabled?: boolean;
    editableContent?: any;
    onSave?: (content: any) => void;
    rowContent?: any;
};

interface EditContent {
    content: string;
    isEditing: boolean;
  }


const Drawer: FunctionComponent<DrawerProps> = ({ title, children, onSave, editableContent, rowContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContents, setEditContents] = useState<EditContent[]>(editableContent || [{ content: '', isEditing: true }]);
    const [currentCardText, setCurrentCardText] = useState("");
    const [currentCardIcon, setCurrentCardIcon] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (isFull) {
            setIsFull(!isFull);
        }
    }
    
    const toggleDrawerFullScreen = () => setIsFull(!isFull);

    const toggleFavorite = () => setIsFavorite(!isFavorite);
    
    const handleCardClick = (text: string, icon: ReactElement) => {
        console.log('click')
        toggleDrawer();
        setCurrentCardText(text);
        setCurrentCardIcon(icon)};

    const toggleEditing = () => setIsEditing(!isEditing);
    const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newContents = editContents.map((item, idx) => idx === index ? { ...item, content: event.target.value } : item);
        setEditContents(newContents);
    };
    const drawerClassName = `fixed top-0 right-0 h-full bg-white transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
        
    } ${isFull ? "w-full" : "w-1/2"}`;

    const addInput = () => {
        setEditContents([...editContents, { content: '', isEditing: true }]);
    };
    
    const saveIndividualChange = (index: number) => {
        const content = editContents[index].content.trim();
        if (!content) {
            setError("Input cannot be empty.");
            return;
        }
        
        setError(null); // Clear error state if input passes validation
    
        const updatedContents = editContents.map((item, idx) => idx === index ? { ...item, isEditing: false } : item);
        setEditContents(updatedContents);
        
        if (onSave) {
            onSave(updatedContents);
        }
            };

    const toggleEdit = (index: number) => {
        const newContents = editContents.map((item, idx) => idx === index ? { ...item, isEditing: !item.isEditing } : item);
        setEditContents(newContents);
    };

    const deleteInput = (index: number) => {
        // Filter out the input at the given index
        const filteredContents = editContents.filter((_, idx) => idx !== index);
        setEditContents(filteredContents);
    };

    const iconComponent = isFull ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />;

    const favoriteIcon = isFavorite ? <SolidStarIcon className="h-5 w-5" /> : <OutlineStarIcon className="h-5 w-5" />

    // const buttonStyle = `ml-2 uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border  bg-white ${isOpen ? `border-gray-200` : ``} shadow hover:bg-gray-50 p-2 rounded-md`


    return (
        <div>
            {/* <Card icon={<BookmarkIcon />} text="Open" onClick={() => handleCardClick("Resources", <BookmarkIcon />)}/> */}
            <button className={"ml-2 uppercase opacity-0 group-hover:opacity-100 text-gray-500 font-medium border border-gray-200 bg-white shadow hover:bg-gray-50 p-2 rounded-md"} onClick={toggleDrawer}>Open</button>
            <div className={drawerClassName}></div>
            <div className={drawerClassName}>
            <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-row items-center justify-between space-x-2">
                <span className="h-5 text-purple-700 w-5">
                    {currentCardIcon}
                    </span>                    
                    <h2 className = "text-sm text-gray-800 font-semibold">{rowContent.username}</h2>
                    </div>
                    <div>
                        <button onClick={toggleFavorite} className="py-2 text-gray-500 hover:text-gray-800 mr-2">
                            {favoriteIcon}
                        </button>
                        <button onClick={toggleDrawerFullScreen} className="py-2 text-gray-500 hover:text-gray-800 mr-2">
                            {iconComponent}
                        </button>
                        <button 
                        onClick={toggleDrawer} className="py-2 text-gray-500 hover:text-gray-800"
                        >
                        <ChevronDoubleLeftIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <div className="p-4" style={{fontSize:16, paddingBottom:'2px'}}>
                    Username: { rowContent.username }
                    </div>
                    <div className="p-4" style={{fontSize:16, paddingBottom:'2px'}}>
                    Role: { rowContent.role }
                    </div>
                    <div className="p-4" style={{fontSize:16, paddingBottom:'2px'}}>
                    Email: { rowContent.email }
                    </div>
                    <div className="p-4" style={{fontSize:16, paddingBottom:'2px'}}>
                    Program: { rowContent.program }
                    </div>
                    <br />
                {
       editContents.map((item, index) => (
        <div key={index} className="flex mb-2 items-center space-x-2">
            {item.isEditing ? (
                <>
                    <input
                        type="text"
                        value={item.content}
                        onChange={handleInputChange(index)}
                        className="border p-2 w-full"
                    />
                    <button 
                        onClick={() => saveIndividualChange(index)} 
                        className="py-2 px-4 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <span className="p-2 w-full">{item.content}</span>
                    <button 
                        onClick={() => toggleEdit(index)} 
                        className="py-2 px-4 bg-green-500 text-white rounded"
                    >
                        Edit
                    </button>
                </>
            )}
            {/* Delete button moved here, outside of the editing conditional */}
            <button 
                onClick={() => deleteInput(index)} 
                className="py-2 text-gray-500 hover:text-gray-800"
            >
            <XMarkIcon className="h-5 w-5" />
            </button>
        </div>
    ))
}
    <button onClick={addInput} className="py-2 px-4 bg-blue-500 text-white rounded my-2">Add New Input</button>
</div>
            </div>
        </div>
    );
};

export default Drawer;

