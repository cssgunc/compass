"use client";

import { PageLayout } from "@/components/PageLayout";
import { Table } from "@/components/Table/Index";

import { UsersIcon } from "@heroicons/react/24/solid";





export default function Page() {
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* icon + title  */}
      <PageLayout title="Users" icon={<UsersIcon />}>
        <Table />
      </PageLayout>
    </div>
  );
}
