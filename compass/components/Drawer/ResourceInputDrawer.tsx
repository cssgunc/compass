import React, { useState } from "react";

const ResourceInputDrawer = ({ isOpen, setIsOpen, setData }) => {
    const [resourceContent, setResourceContent] = useState({
        name: "",
        link: "",
        program: "",
        summary: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResourceContent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setData((prevData) => [...prevData, resourceContent]);
        setIsOpen(false); // Close drawer after saving
    };

    const toggleDrawerClass = isOpen ? "translate-x-0 shadow-xl" : "translate-x-full";

    return (
        <div
            className={`fixed top-0 right-0 w-1/2 h-full bg-white transform ease-in-out duration-300 z-20 ${toggleDrawerClass}`}
        >
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-medium text-gray-800">Add New Resource</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500">
                    Close
                </button>
            </div>
            <div className="p-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={resourceContent.name}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />

                <label className="block mt-4 text-sm font-medium text-gray-700">Link</label>
                <input
                    type="url"
                    name="link"
                    value={resourceContent.link}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />

                <label className="block mt-4 text-sm font-medium text-gray-700">Program</label>
                <input
                    type="text"
                    name="program"
                    value={resourceContent.program}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />

                <label className="block mt-4 text-sm font-medium text-gray-700">Summary</label>
                <textarea
                    name="summary"
                    value={resourceContent.summary}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded"
                />

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourceInputDrawer;
