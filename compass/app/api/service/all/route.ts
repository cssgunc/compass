import Service from "@/utils/models/Service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_HOST}/api/service`;

    console.log(apiEndpoint);

    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    const data = await fetch(`${apiEndpoint}?uuid=${uuid}`);

    const serviceData: Service[] = await data.json();
    // TODO: Remove make every service visible

    const services = serviceData.map((service: Service) => {
        service.visible = true;

        return service;
    });

    return NextResponse.json(services, { status: data.status });
}
