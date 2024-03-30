import { FunctionComponent, ReactElement, ReactNode } from 'react';
import Button from '@/components/Button'
import React, { useState } from 'react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Card from '@/components/page/Card'



type DrawerProps = {
    title: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset"; // specify possible values for type
    disabled?: boolean;
    editableContent?: any;
    onSave?: (content: any) => void;
};

interface EditContent {
    content: string;
    isEditing: boolean;
  }


const Drawer: FunctionComponent<DrawerProps> = ({ title, children, onSave, editableContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContents, setEditContents] = useState<EditContent[]>(editableContent || [{ content: '', isEditing: true }]);
    const [currentCardText, setCurrentCardText] = useState("");
    const [currentCardIcon, setCurrentCardIcon] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const toggleDrawer = () => setIsOpen(!isOpen);
    
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
    const drawerClassName = `fixed top-0 right-0 w-1/2 h-full bg-white shadow-xl transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
    }`;

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


    return (
        <div>
            <Card icon={<BookmarkIcon />} text="Resources" onClick={() => handleCardClick("Resources", <BookmarkIcon />)}/>
            <div className={drawerClassName}>
            <div className="flex items-center justify-between p-4 border-b">
                <span className="h-5 text-purple-700 w-5">
                    {currentCardIcon}
                    </span>                    
                    <h2>{currentCardText}</h2>
                    <div>
                        <button 
                        onClick={toggleDrawer} className="py-2 text-gray-500 hover:text-gray-800"
                        >
                        <ChevronDoubleLeftIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="p-4">
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

