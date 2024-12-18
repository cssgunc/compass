import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "../models/User";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    const { data, error } = await supabase.auth.getUser();

    const authenticatedRoutes = ["/admin", "/resource", "/home", "/service"];
    const pathname = request.nextUrl.pathname;

    for (const route of authenticatedRoutes) {
        if (error && pathname.startsWith(route)) {
            console.log("redirected");
            return NextResponse.redirect(
                new URL(
                    "/auth/login",
                    request.nextUrl.protocol + "//" + request.nextUrl.host
                )
            );
        }
    }

    if (pathname.startsWith("/admin") && data.user) {
        // After the previous checks we can assume the user is not empty
        const userData = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${data.user.id}`
        );

        const user: User = await userData.json();

        if (user.role !== Role.ADMIN) {
            console.log("redirected as not admin");
            return NextResponse.redirect(
                new URL(
                    "/home",
                    request.nextUrl.protocol + "//" + request.nextUrl.host
                )
            );
        }
    }

    if (data.user && pathname.startsWith("/auth/login")) {
        return NextResponse.redirect(
            new URL(
                "/home",
                request.nextUrl.protocol + "//" + request.nextUrl.host
            )
        );
    }

    return response;
}
