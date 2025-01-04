import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import "tailwindcss/tailwind.css";
import { TagsArray } from "./TagsArray";
import { TagDropdown } from "./TagDropdown";
import { CreateNewTagAction } from "./CreateNewTagAction";

interface TagsInputProps {
    presetOptions: string[];
    presetValue: string[];
    setPresetOptions: Dispatch<SetStateAction<string[]>>;
    onTagsChange?: (tags: Set<string>) => void;
    singleValue?: boolean;
}

const TagsInput: React.FC<TagsInputProps> = ({
    presetValue,
    presetOptions,
    setPresetOptions,
    onTagsChange,
    singleValue = false,
}) => {
    const [inputValue, setInputValue] = useState("");
    const [cellSelected, setCellSelected] = useState(false);

    // TODO: Add tags to the database and remove the presetValue and lowercasing
    const [tags, setTags] = useState<Set<string>>(
        new Set(presetValue.map((tag) => tag.toLowerCase()))
    );
    const [options, setOptions] = useState<Set<string>>(
        new Set(presetOptions.map((option) => option.toLowerCase()))
    );
    const [filteredOptions, setFilteredOptions] = useState<Set<string>>(
        new Set(presetOptions)
    );
    const dropdown = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!cellSelected) {
            setCellSelected(true);
            setTimeout(() => {
                window.addEventListener("click", handleOutsideClick);
            }, 100);
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        console.log(dropdown.current);
        if (
            dropdown.current &&
            !dropdown.current.contains(event.target as Node)
        ) {
            console.log("outside");
            setCellSelected(false);
            window.removeEventListener("click", handleOutsideClick);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilteredOptions(() => {
            const newOptions = presetOptions.filter((item) =>
                item.includes(e.target.value.toLowerCase())
            );
            return new Set(newOptions);
        });
        setInputValue(e.target.value); // Update input value state
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            if (singleValue && tags.size >= 1) {
                // Don't add new tag if we're in single value mode and already have a tag
                return;
            }
            addTag(e);
        }
    };

    const addTag = (e?: React.KeyboardEvent<HTMLInputElement>) => {
        e?.stopPropagation();

        const newTags = new Set(Array.from(tags).concat(inputValue));
        setOptions(new Set(Array.from(options).concat(inputValue)));
        setTags(newTags);
        setFilteredOptions(new Set(Array.from(options).concat(inputValue)));
        setInputValue("");
        onTagsChange?.(newTags);
    };

    const handleSelectTag = (tagToAdd: string) => {
        if (singleValue) {
            const newTags = new Set([tagToAdd]);
            setTags(newTags);
            onTagsChange?.(newTags);
        } else if (!tags.has(tagToAdd)) {
            const newTags = new Set(Array.from(tags).concat(tagToAdd));
            setTags(newTags);
            onTagsChange?.(newTags);
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        const newTags = new Set(
            Array.from(tags).filter((tag) => tag !== tagToDelete)
        );
        setTags(newTags);
        onTagsChange?.(newTags);
    };

    const handleDeleteTagOption = (tagToDelete: string) => {
        setOptions(
            new Set(
                Array.from(options).filter((option) => option !== tagToDelete)
            )
        );

        setFilteredOptions(
            new Set(
                Array.from(options).filter((option) => option !== tagToDelete)
            )
        );

        if (tags.has(tagToDelete)) {
            handleDeleteTag(tagToDelete);
        }
    };

    const handleEditTag = (oldTag: string, newTag: string) => {
        if (oldTag !== newTag) {
            setTags(
                new Set(
                    Array.from(tags)
                        .filter((tag) => tag !== oldTag)
                        .concat(newTag)
                )
            );
            setOptions(
                new Set(
                    Array.from(options)
                        .filter((option) => option !== oldTag)
                        .concat(newTag)
                )
            );
        }
    };

    return (
        <div className="cursor-pointer" onClick={handleClick}>
            {!cellSelected ? (
                <TagsArray
                    active={true}
                    handleDelete={handleDeleteTag}
                    tags={tags}
                />
            ) : (
                <div ref={dropdown}>
                    <div className="absolute w-64 z-50 ml-1 mt-5">
                        <div className="rounded-md border border-gray-200 shadow">
                            <div className="flex flex-wrap rounded-t-md items-center gap-2 bg-gray-50 p-2">
                                <TagsArray
                                    handleDelete={handleDeleteTag}
                                    active
                                    tags={tags}
                                />
                                {(!singleValue || tags.size === 0) && (
                                    <input
                                        type="text"
                                        value={inputValue}
                                        placeholder={
                                            singleValue && tags.size > 0
                                                ? ""
                                                : "Search for an option..."
                                        }
                                        onChange={handleInputChange}
                                        onKeyDown={handleAddTag}
                                        className="focus:outline-none bg-transparent"
                                        autoFocus
                                    />
                                )}
                            </div>
                            <div className="flex rounded-b-md bg-white flex-col border-t border-gray-100 text-2xs font-medium text-gray-500 p-2">
                                <p className="capitalize">
                                    {singleValue && tags.size > 0
                                        ? "Only one option can be selected"
                                        : "Select an option or create one"}
                                </p>
                                {(!singleValue || tags.size === 0) && (
                                    <>
                                        <TagDropdown
                                            handleDeleteTag={
                                                handleDeleteTagOption
                                            }
                                            handleEditTag={handleEditTag}
                                            handleAdd={handleSelectTag}
                                            tags={filteredOptions}
                                        />
                                        {inputValue.length > 0 && (
                                            <CreateNewTagAction
                                                input={inputValue}
                                                addTag={addTag}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagsInput;
