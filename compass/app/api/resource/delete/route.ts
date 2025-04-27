import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/resource`;

    try {
        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");
        const resource_id = searchParams.get("id");

        console.log("Resource to be deleted", resource_id);

        // Send the POST request to the backend
        const response = await fetch(
            `${apiEndpoint}?uuid=${uuid}&id=${resource_id}`,
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
            { message: "Resource deleted successfully" },
            { status: response.status }
        );
    } catch (error) {
        console.error("Error deleting resource:", error);
        return NextResponse.json(
            { error: "Failed to delete resource" },
            { status: 500 }
        );
    }
}
