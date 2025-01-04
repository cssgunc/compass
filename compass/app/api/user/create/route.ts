import { NextResponse } from "next/server";
import User from "@/utils/models/User";

export async function POST(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/user/create`;

    try {
        const userData = await request.json();
        userData.role = userData.role.toUpperCase();
        userData.program = userData.program.map((program: string) =>
            program.toUpperCase()
        );

        console.log("USER DATA", JSON.stringify(userData));

        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");

        // Send the POST request to the backend
        const response = await fetch(`${apiEndpoint}?uuid=${uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdUser: User = await response.json();
        return NextResponse.json(createdUser, { status: response.status });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
