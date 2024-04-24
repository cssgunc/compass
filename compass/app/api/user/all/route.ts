import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/user/all`;

    console.log(apiEndpoint);

    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    const data = await fetch(`${apiEndpoint}?user_id=${uuid}`);

    return NextResponse.json(await data.json(), { status: data.status });
}
