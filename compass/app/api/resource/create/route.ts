import { NextResponse } from "next/server";
import User from "@/utils/models/User";

export async function POST(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/resource`;

    try {
        const resourceData = await request.json();

        console.log("RESOURCE DATA", JSON.stringify(resourceData));

        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");

        // Send the POST request to the backend
        const response = await fetch(`${apiEndpoint}?uuid=${uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resourceData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdResource: User = await response.json();
        return NextResponse.json(createdResource, { status: response.status });
    } catch (error) {
        console.error("Error creating resource:", error);
        return NextResponse.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
