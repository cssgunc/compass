"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import User from "@/utils/models/User";
import { Program, Role } from "@/utils/models/User";
import { createClient } from "@/utils/supabase/client";

export default function EditProfile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const supabase = await createClient();
                const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

                if (authError || !authUser) {
                    throw new Error("Authentication required");
                }

                const response = await fetch(`/api/user?uuid=${authUser.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const currentUser = await response.json();
                
                if (!currentUser) {
                    throw new Error("User not found");
                }

                setUser(currentUser);
            } catch (err) {
                setError("Failed to load user data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        try {
            const formData = new FormData(e.currentTarget);
            const updatedUser = {
                ...user,
                username: formData.get("username") as string,
                email: formData.get("email") as string,
                group: formData.get("group") as string,
                experience: parseInt(formData.get("experience") as string),
                program: formData.getAll("program") as Program[],
            };

            const response = await fetch(`/api/user/update?uuid=${user.uuid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            setSuccess(true);
        } catch (err) {
            setError("Failed to update profile");
            console.error(err);
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (!user) {
        return <div className="p-4">User not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Profile updated successfully! Refreshing page...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        defaultValue={user.username}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Group</label>
                    <input
                        type="text"
                        name="group"
                        defaultValue={user.group}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                    <input
                        type="number"
                        name="experience"
                        defaultValue={user.experience}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Programs</label>
                    <div className="mt-2 space-y-2">
                        {Object.values(Program).map((program) => (
                            <label key={program} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="program"
                                    value={program}
                                    defaultChecked={user.program.includes(program)}
                                    className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                                <span className="ml-2">{program}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
} 