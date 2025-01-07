import Resource from "@/utils/models/Resource";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/resource`;

    try {
        const resourceData = await request.json();

        console.log("RESOURCE DATA", JSON.stringify(resourceData));

        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");

        // Send the POST request to the backend
        const response = await fetch(`${apiEndpoint}?uuid=${uuid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resourceData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resource: Resource = await response.json();
        return NextResponse.json(resource, { status: response.status });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to update resource" },
            { status: 500 }
        );
    }
}
