import { Component } from "react"

// interface TableHeader {
//   title: string,
//   type: string
// }

// interface TableRow {
//   [key: string]: any,
// }
interface TableProps {
  headersData: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ headersData, data }) => {
  const headers = headersData.map((header, i) => {
    return <th key={"header-" + i} >{header}</th>
  })

  console.log(data);

  const rows = data.map((item) => {
    const row = headersData.map(key => {
      return <td key={"item-" + item.id + key}>{item[key]}</td>
    });
    return <tr key={"item-" + item.id}>{row}</tr>
  })

  return (<>
    <table>
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </>);

}

export default Table
