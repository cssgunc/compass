import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/service`;

    try {
        const { searchParams } = new URL(request.url);
        const uuid = searchParams.get("uuid");
        const service_id = searchParams.get("id");

        console.log("Service to be deleted", service_id);

        // Send the POST request to the backend
        const response = await fetch(
            `${apiEndpoint}?uuid=${uuid}&id=${service_id}`,
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
            { message: "Service deleted successfully" },
            { status: response.status }
        );
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json(
            { error: "Failed to delete service" },
            { status: 500 }
        );
    }
}
