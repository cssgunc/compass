import React from "react";

interface NewResource {
    name: string;
    link: string;
    program?: string;
    summary?: string;
}

interface NewResourceSidebarProps {
    isOpen: boolean;
    newResource: NewResource;ß
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NewResourceSidebar: React.FC<NewResourceSidebarProps> = ({ isOpen, newResource, handleInputChange, handleSubmit }) => {
    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
            <div className="absolute right-0 w-1/3 bg-white p-4">
                <h2 className="text-lg font-bold mb-4">Add New Resource</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newResource.name}
                            onChange={handleInputChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm">Link</label>
                        <input
                            type="url"
                            name="link"
                            value={newResource.link}
                            onChange={handleInputChange}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm">Program</label>
                        <input
                            type="text"
                            name="program"
                            value={newResource.program}
                            onChange={handleInputChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm">Summary</label>
                        <textarea
                            name="summary"
                            value={newResource.summary}
                            onChange={handleInputChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Add Resource
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewResourceSidebar;