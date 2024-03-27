"use client";
import Table from "@/components/Table";
import { useState } from "react";
import untypedDataExample from "./users.json" // EXAMPLE DATA!!!
const dataExample = untypedDataExample as User[];

type User = {
  id: number;
  created_at: any;
  username: string;
  role: "ADMIN" | "EMPLOYEE" | "VOLUNTEER";
  email: string;
  program: "DOMESTIC" | "ECONOMIC" | "COMMUNITY";
  experience: number;
  group?: string;
}

export default function Page() {
  const headers = ["username", "role", "email", "program", "experience"]
  const [data, setData] = useState<User[]>([...dataExample])

  return (
    <>
    <h1>EXAMPLE DATA / WORK IN PROGRESS!!</h1>
      <Table headers={headers} data={data} />
    </>);

}
