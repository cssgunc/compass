"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(username: string, password: string) {
    const supabase = createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: username,
        password: password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/auth/error");
    }

    revalidatePath("/resource", "layout");
    redirect("/resource");
}
