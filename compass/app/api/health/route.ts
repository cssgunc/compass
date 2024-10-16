import { NextResponse } from "next/server";

export async function GET() {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/health`;

    const result = await fetch(apiEndpoint);

    return NextResponse.json(await result.json(), { status: result.status });
}
