// pages/forgot-password.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import InlineLink from '@/components/InlineLink';
import Paper from '@/components/auth/Paper';
import ErrorBanner from '@/components/auth/ErrorBanner';


export default function ForgotPasswordPage() {
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);


    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email cannot be empty');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        return true; // No error
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        isValidEmail(confirmEmail);
        event.preventDefault();
    }

    return (
        <>
                    <h1 className="font-bold text-xl text-purple-800">Forgot Password</h1>
                    <div className="mb-6">
                        <Input
                            type='email'
                            valid={emailError == null}
                            title="Enter your email address"
                            placeholder="janedoe@gmail.com"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                        />
                    </div>
                    {emailError && <ErrorBanner heading={emailError} />}
                    <div className="flex flex-col items-left space-y-4">
                        <InlineLink href="/auth/login">
                            Back to Sign In
                        </InlineLink>
                        <Button type="submit" onClick={handleClick}>
                            Send
                        </Button>
                    </div>

        </>
    );
}
