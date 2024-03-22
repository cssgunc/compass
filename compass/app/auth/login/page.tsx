// pages/index.tsx
"use client";

import Button from '@/components/Button';
import Input from '@/components/Input'
import InlineLink from '@/components/InlineLink';
import Image from 'next/image';
import { useState } from "react";
import PasswordInput from '@/components/auth/PasswordInput';
import ErrorBanner from '@/components/auth/ErrorBanner';

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Priority: Incorrect combo > Missing email > Missing password

        if (password.trim().length === 0) {
            setEmailError("Please enter your password.")
            event.preventDefault();
        }
        // This shouldn't happen, <input type="email"> already provides validation, but just in case.
        if (email.trim().length === 0) {
            setPasswordError("Please enter your email.")
            event.preventDefault();
        }
        // Placeholder for incorrect email + password combo.
        if (email === "incorrect@gmail.com" && password) {
            setPasswordError("Incorrect password.")
            event.preventDefault();
        }
    }

    return (
        <>
                    <Image
                        src="/logo.png"
                        alt='Compass Center logo.'
                        width={100}
                        height={91}
                    />

                    <h1 className='font-bold text-xl text-purple-800'>Login</h1>

                    <div className="mb-6">
                        <Input type='email' valid={emailError == ""} title="Email" placeholder="janedoe@gmail.com" onChange={handleEmailChange} required />
                        
                    </div>
                    {emailError && <ErrorBanner heading={emailError} />}

                    <div className="mb-6">
                        <PasswordInput title="Password" valid={passwordError == ""} onChange={handlePasswordChange} />
                        
                    </div>
                    {passwordError && <ErrorBanner heading={passwordError} />}

                    <div className="flex flex-col items-left space-y-4">
                        <InlineLink href="/auth/forgot_password">
                            Forgot password?
                        </InlineLink>
                        <Button onClick={handleClick}>
                            Login
                        </Button>
                    </div>


        </>
    );
};

