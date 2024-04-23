import { NextResponse } from "next/server";

interface ResponseData {
  message: string;
}

export async function GET() {
  return NextResponse.json({ message: "Hello World!" }, { status: 200 });
}
