import DataPoint from "@/utils/models/DataPoint";
import { Column } from "@tanstack/react-table";
import { Details } from "../Drawer/Drawer";
import { useEffect, useState } from "react";
import TagsInput from "../TagsInput/Index";

export type FilterFn = "arrIncludesSome" | "arrIncludesAll";

interface FilterDropdownProps<T extends DataPoint> {
    details: Details;
    column: Column<T, any>;
    setFilterFn?: (field: string, filterFn: FilterFn) => void;
}

export default function FilterDropdown<T extends DataPoint>({
    details,
    column,
    setFilterFn,
}: FilterDropdownProps<T>) {
    const filterState = useState<FilterFn | null>(
        details.inputType === "select-multiple" ||
            details.inputType === "select-one"
            ? "arrIncludesSome"
            : null
    );
    const [filter] = filterState;
    const { inputType, presetOptionsValues, presetOptionsSetter } = details;

    useEffect(() => {
        if (filter && setFilterFn) {
            setFilterFn(details.key, filter);
            column.setFilterValue((prev: any) => prev);
        }
    }, [details.key, filter, setFilterFn, column]);

    switch (inputType) {
        case "select-one":
            return (
                <div className="absolute -top-5 -left-1">
                    <TagsInput
                        presetOptions={presetOptionsValues ?? []}
                        setPresetOptions={presetOptionsSetter ?? (() => {})}
                        presetValue={[]}
                        onTagsChange={(tags) => {
                            const tagsArray = Array.from(tags);
                            column.setFilterValue(tagsArray);
                        }}
                        cellSelectedPreset={true}
                    />
                </div>
            );
        case "select-multiple":
            return (
                <div className="absolute -top-5 -left-1">
                    <TagsInput
                        presetOptions={presetOptionsValues ?? []}
                        setPresetOptions={presetOptionsSetter ?? (() => {})}
                        presetValue={[]}
                        onTagsChange={(tags) => {
                            const tagsArray = Array.from(tags);
                            column.setFilterValue(tagsArray);
                        }}
                        cellSelectedPreset={true}
                        filterState={filterState}
                    />
                </div>
            );
        default:
            return (
                <div className="flex flex-col px-4 py-2">
                    <span>Contains</span>
                    <input
                        type="text"
                        value={(column.getFilterValue() ?? "") as string}
                        onChange={(e) => {
                            column.setFilterValue(e.target.value);
                        }}
                        placeholder="Type a value…"
                        className="border border-gray-300 rounded p-1"
                    />
                </div>
            );
    }
}
