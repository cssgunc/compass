import { Component } from "react"

// interface TableHeader {
//   title: string,
//   type: string
// }

// interface TableRow {
//   [key: string]: any,
// }
interface TableProps {
  headers: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  const th = headers.map((header, i) => {
    return <th key={"header-" + i} >{header}</th>
  })

  console.log(data);

  const rows = data.map((item) => {
    const row = headers.map(key => {
      return <td key={"item-" + item.id + key}>{item[key]}</td>
    });
    return <tr key={"item-" + item.id}>{row}</tr>
  })

  return (<>
    <table>
      <thead>
        <tr>
          {th}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </>);

}

export default Table
