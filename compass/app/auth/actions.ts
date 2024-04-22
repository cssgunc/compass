"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function login(email: string, password: string) {
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

    revalidatePath("/resource", "layout");
    redirect("/resource");
}

export async function signOut() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("auth/login");
    }

    supabase.auth.signOut();

    revalidatePath("/resource", "layout");
    redirect("/auth/login");
}
