/* A lone table cell. Passed in for "cell" for a TanStack Table. */
import { useState, useEffect } from "react";

export const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
    };
    // focus:border focus:border-gray-200
    const className =
        "w-full p-3 bg-inherit rounded-md outline-none border border-transparent relative " +
        "focus:shadow-md focus:border-gray-200 focus:bg-white focus:z-20 focus:p-4 focus:-m-1 " +
        "focus:w-[calc(100%+0.5rem)]";

    return (
        <input
            className={className}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    );
};
