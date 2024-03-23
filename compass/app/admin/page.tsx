"use client";
import Table from "@/components/Table";
import { useState } from "react";

// TODO: Example data. Remove later.
const headersExample = ["username", "email", "role", "password"];
const dataExample = [
  {id: 1, username: "example", email: "example@gmail.com", role: "role"},
  {id: 3, username: "erhgoejnrgexample", email: "example@gmail.com", role: "role"},
  {id: 2, username: "another one", email: "example@gmail.com", role: "role"},
  {id: 4, username: "examgoiadnfgople", email: "example@gmail.com", role: "role"},
  {id: 5, username: "edfhgiebroxample", email: "example@gmail.com", role: "role"},
  {id: 6, username: "examlsdfkjg", email: "example@gmail.com", role: "role"},
  {id: 7, username: "exkkkample", email: "example@gmail.com", role: "role"},
]

export default function Page() {
  const [data, setData] = useState({
    headers: [...headersExample],
    data: [...dataExample],
  });

  return (
    <>
      <Table headersData={data.headers} data={data.data} />
    </>)

}
