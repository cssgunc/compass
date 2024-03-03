// pages/index.tsx
"use client";

import Button from '@/components/Button';
import Input from '@/components/Input'
import InlineLink from '@/components/InlineLink';
import Paper from '@/components/auth/Paper';
import Image from 'next/image';
import { ChangeEvent, useState } from "react";
import PasswordInput from '@/components/auth/PasswordInput';

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Priority: Incorrect combo > Missing email > Missing password

        if (password.trim().length === 0) {
            setError("Please enter your password.")
            event.preventDefault();
        }
        // This shouldn't happen, <input type="email"> already provides validation, but just in case.
        if (email.trim().length === 0) {
            setError("Please enter your email.")
            event.preventDefault();
        }
        // Placeholder for incorrect email + password combo.
        if (email === "incorrect@gmail.com" && password) {
            setError("Incorrect password.")
            event.preventDefault();
        }
    }

    return (
        <>
            <Paper>
                <form className="mb-0 m-auto mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white max-w-xl">
                    <Image
                        src="/logo.png"
                        alt='Compass Center logo.'
                        width={100}
                        height={91}
                    />

                    <h1 className='font-bold text-xl text-purple-800'>Login</h1>

                    <div className="mb-4">
                        <Input type='email' title="Email" placeholder="janedoe@gmail.com" onChange={handleEmailChange} required />
                    </div>

                    <div className="mb-6">
                        <PasswordInput title="Password" onChange={handlePasswordChange} required />
                    </div>

                    <div className="flex flex-col items-left space-y-4">
                        <InlineLink href="/auth/forgot_password">
                            Forgot password?
                        </InlineLink>
                        <Button onClick={handleClick}>
                            Login
                        </Button>
                        <div className="text-center text-red-600" hidden={!error}>
                            <p>{error}</p>
                        </div>
                    </div>

                </form>
                <p className="text-center mt-6 text-gray-500 text-xs">
                    &copy; 2024 Compass Center
                </p>
            </Paper>
        </>
    );
};

