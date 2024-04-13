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

  return <input className="w-full py-2 bg-inherit" value={value} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
};
