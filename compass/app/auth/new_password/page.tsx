// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import PasswordInput from "@/components/auth/PasswordInput";
import ErrorBanner from "@/components/auth/ErrorBanner";

function isStrongPassword(password: string): boolean {
    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return strongPasswordRegex.test(password);
}

export default function Page() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(
            newPassword === "" ||
                confirmPassword === "" ||
                newPassword !== confirmPassword ||
                !isStrongPassword(newPassword)
        );
    }, [newPassword, confirmPassword]);

    return (
        <>
            <div className="text-center sm:text-left">
                <h1 className="font-bold text-xl text-purple-800">
                    New Password
                </h1>
            </div>
            <div className="mb-4">
                <PasswordInput
                    title="Enter New Password"
                    value={newPassword}
                    valid={!isButtonDisabled || isStrongPassword(newPassword)}
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                    }}
                />
            </div>
            {isStrongPassword(newPassword) || newPassword === "" ? null : (
                <ErrorBanner
                    heading="Password is not strong enough."
                    description="Tip: Use a mix of letters, numbers, and symbols for a strong password. Aim for at least 8 characters!"
                />
            )}
            <div className="mb-6">
                <PasswordInput
                    title="Confirm Password"
                    value={confirmPassword}
                    valid={
                        !isButtonDisabled ||
                        (newPassword === confirmPassword &&
                            confirmPassword !== "")
                    }
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
            </div>
            {newPassword === confirmPassword ||
            confirmPassword === "" ? null : (
                <ErrorBanner
                    heading="Passwords do not match."
                    description="Please make sure both passwords are the exact same!"
                />
            )}
            <div className="flex flex-col items-left space-y-4">
                <Button type="submit" disabled={isButtonDisabled}>
                    Send
                </Button>
            </div>
        </>
    );
}
