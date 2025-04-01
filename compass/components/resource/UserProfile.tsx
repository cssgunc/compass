import { useState } from "react";
import { signOut } from "@/app/auth/actions";
import Link from "next/link";

interface UserProfileProps {
    name: string;
    email: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);
    await signOut();
};

export const UserProfile = ({ name, email, setLoading }: UserProfileProps) => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                    {name}
                </span>
                <span className="text-xs text-gray-500">{email}</span>
            </div>
            <Link
                href="/profile/edit"
                className="text-purple-600 font-semibold text-xs hover:underline mt-1"
            >
                Edit profile
            </Link>
            <button
                onClick={(event) => handleClick(event, setLoading)}
                className="text-red-600 font-semibold text-xs hover:underline mt-1"
            >
                Sign out
            </button>
        </div>
    );
};
