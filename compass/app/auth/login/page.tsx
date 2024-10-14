// pages/index.tsx
"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InlineLink from "@/components/InlineLink";
import Image from "next/image";
import { useEffect, useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import ErrorBanner from "@/components/auth/ErrorBanner";
import { login } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("here");
    },[])

    useEffect(() => {
        const supabase = createClient();
        async function checkUser() {
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                router.push("/home");
            }
        }
        checkUser();
    }, [router]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.currentTarget.value);
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim().length === 0) {
            setEmailError("Please enter your email.");
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailError("");

        if (password.trim().length === 0) {
            setPasswordError("Please enter your password.");
            return;
        }
        setPasswordError("");

        setIsLoading(true);
        const error = await login(email, password);
        setIsLoading(false);

        if (error) {
            setLoginError(error);
        }
    };

    return (
        <>
            <Image
                src="/logo.png"
                alt="Compass Center logo."
                width={100}
                height={91}
            />
            <h1 className="font-bold text-2xl text-purple-800">Login</h1>
            <div className="mb-6">
                <Input
                    type="email"
                    valid={emailError === ""}
                    title="Email"
                    placeholder="Enter Email"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            {emailError && <ErrorBanner heading={emailError} />}
            <div className="mb-6">
                <PasswordInput
                    title="Password"
                    placeholder="Enter Password"
                    valid={passwordError === ""}
                    onChange={handlePasswordChange}
                />
            </div>
            {passwordError && <ErrorBanner heading={passwordError} />}
            <div className="flex flex-col items-left space-y-4">
                <InlineLink href="/auth/forgot_password">
                    Forgot password?
                </InlineLink>
                <Button onClick={handleClick} disabled={isLoading}>
                    <div className="flex items-center justify-center">
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-white border-t-purple-500 rounded-full animate-spin mr-2"></div>
                        )}
                        {isLoading ? "Logging in..." : "Login"}
                    </div>
                </Button>
            </div>
            {loginError && <ErrorBanner heading={loginError} />}
        </>
    );
}
