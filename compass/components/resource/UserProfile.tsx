import { signOut } from "@/app/auth/actions";

interface UserProfileProps {
    name: string;
    email: string;
}

const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await signOut();
};

export const UserProfile = ({ name, email }: UserProfileProps) => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                    {name}
                </span>
                <span className="text-xs text-gray-500">{email}</span>
            </div>
            <button
                onClick={handleClick}
                className="text-red-600 font-semibold text-xs hover:underline mt-1"
            >
                Sign out
            </button>
        </div>
    );
};
