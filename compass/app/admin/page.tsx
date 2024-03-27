"use client"

import { PageLayout } from "@/components/admin/PageLayout"

import { BookmarkIcon } from "@heroicons/react/24/solid"

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* icon + title  */}
            <PageLayout title="Resources" icon={<BookmarkIcon  />}  />
        </div>
    )
}
