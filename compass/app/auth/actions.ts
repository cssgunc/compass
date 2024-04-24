"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import User, { Role } from "@/utils/models/User";

export async function login(email: string, password: string) {
    const supabase = createClient();
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email,
        password,
    };
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
        return "Incorrect email/password";
    }

    const supabaseUser = await supabase.auth.getUser();

    if (!supabaseUser.data.user) {
        revalidatePath("/resource", "layout");
        redirect("/resource");
    }

    const apiData = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/user?uuid=${supabaseUser.data.user.id}`
    );

    const user: User = await apiData.json();

    console.log(user);

    if (user.role === Role.ADMIN) {
        redirect("/admin");
    }

    revalidatePath("/resource", "layout");
    redirect("/resource");
}

export async function signOut() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("auth/login");
    }

    console.log(`Signed out ${data.user.email}!`);

    await supabase.auth.signOut();

    revalidatePath("/resource", "layout");
    redirect("/auth/login");
}
