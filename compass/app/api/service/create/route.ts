import { NextResponse } from "next/server";
import User from "@/utils/models/User";

export async function POST(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/service`;

    try {
        const serviceData = await request.json();

        console.log("SERVICE DATA", JSON.stringify(serviceData));

        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");

        // Send the POST request to the backend
        const response = await fetch(`${apiEndpoint}?uuid=${uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serviceData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdService: User = await response.json();
        return NextResponse.json(createdService, { status: response.status });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json(
            { error: "Failed to create service" },
            { status: 500 }
        );
    }
}
