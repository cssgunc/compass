"use client";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    router.push("/auth/login");

    return <h1>GO TO LOGIN PAGE (/auth/login)</h1>;
}
