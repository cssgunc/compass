import Resource from "@/utils/models/Resource";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/resource`;

    console.log(apiEndpoint);

    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    const data = await fetch(`${apiEndpoint}?user_id=${uuid}`);

    const resourceData: Resource[] = await data.json();
    // TODO: Remove make every resource visible

    const resources = resourceData.map((resource: Resource) => {
        resource.visible = true;

        return resource;
    });

    return NextResponse.json(resources, { status: data.status });
}
