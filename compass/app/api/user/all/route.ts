import User from "@/utils/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/user/all`;

    console.log(apiEndpoint);

    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    const data = await fetch(`${apiEndpoint}?user_id=${uuid}`);

    const userData: User[] = await data.json();
    // TODO: Remove make every user visible

    const users = userData.map((user: User) => {
        user.visible = true;

        return user;
    });

    return NextResponse.json(users, { status: data.status });
}
