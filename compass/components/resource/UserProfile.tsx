import { useState } from "react";
import { signOut } from "@/app/auth/actions";
import LoggingOut from "../auth/LoggingOut";

interface UserProfileProps {
    name: string;
    email: string;
}

const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);  // Set loading state to true

    // Call signOut and wait for the process to complete before redirecting
    await signOut();

    // Once signOut is complete, the redirect should happen, but let's delay it to allow the loading state to be visible for a short time
    setTimeout(() => {
        // The signOut already handles the redirect, so we don't need to redirect here again.
        setLoading(false);  // Reset the loading state after the timeout (just in case)
    }, 1000);  // You can adjust this delay as needed
};

export const UserProfile = ({ name, email }: UserProfileProps) => {
    const [loading, setLoading] = useState(false);

    if (loading) {
        // Show the "Logging out" screen while the sign-out process is in progress
        return <LoggingOut />;
    }

    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">{name}</span>
                <span className="text-xs text-gray-500">{email}</span>
            </div>
            <button
                onClick={(event) => handleClick(event, setLoading)}
                className="text-red-600 font-semibold text-xs hover:underline mt-1"
                disabled={loading} // Disable button while loading
            >
                 {loading ? "Signing out..." : "Sign out"} {/* Show appropriate text */}
            </button>
        </div>
    );
};