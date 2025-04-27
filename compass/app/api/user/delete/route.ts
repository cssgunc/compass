import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/user`;

    try {
        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");
        const user_id = searchParams.get("id");

        console.log("User to be deleted", user_id);

        // Send the POST request to the backend
        const response = await fetch(
            `${apiEndpoint}?uuid=${uuid}&id=${user_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: response.status }
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
        );
    }
}
