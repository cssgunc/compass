import { FunctionComponent, ReactNode } from 'react';
import Button from '@/components/Button'
import React, { useState } from 'react';
import {DATATYPE} from '@/utils/constants'
import InlineLink from '@/components/InlineLink'


type DrawerProps = {
    title: string;
    children: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset"; // specify possible values for type
    disabled?: boolean;
    editableContent?: any;
    onSave?: (content: any) => void;
};

const Drawer: FunctionComponent<DrawerProps> = ({ title, children, onSave, editableContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(editableContent || '');

    const toggleDrawer = () => setIsOpen(!isOpen);
    const toggleEditing = () => setIsEditing(!isEditing);
    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditContent(event.target.value);
    };

    const drawerClassName = `fixed top-0 right-0 w-1/2 h-full bg-white shadow-xl transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
    }`;
    
    const saveChanges = () => {
        console.log(editContent);
        if (onSave) {
            onSave(editContent);
        }
        setIsEditing(false);
    };

    const addRow = () => {
        
    }

    return (
        <div>
            <Button onClick={toggleDrawer}>{isOpen ? "Close" : "Open"} Drawer</Button>
            <div className={drawerClassName}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2>{title}</h2>
                    <div>
                        <Button onClick={toggleEditing}>{isEditing ? 'Cancel' : 'Edit'}</Button>
                        <Button onClick={toggleDrawer}>&laquo;</Button>
                    </div>
                </div>
                <div className="p-4">
                    {isEditing ? (
                        <>
                            <input
                                type= 'text'
                                value={editContent}
                                onChange={handleContentChange}
                                className="border p-2 w-full"
                            />
                            <InlineLink onClick={saveChanges}>Save</InlineLink>
                        </>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
};

export default Drawer;