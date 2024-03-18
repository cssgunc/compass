// pages/forgot-password.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import InlineLink from '@/components/InlineLink';
import Paper from '@/components/auth/Paper';
import ErrorBanner from '@/components/auth/ErrorBanner';

function isValidEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        return 'Email cannot be empty';
    } else if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }
    return null; // No error
}

export default function ForgotPasswordPage() {
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const error = isValidEmail(confirmEmail);
        setEmailError(error); // set the error message based on validation
        setIsButtonDisabled(!!error); // disable button if there is an error
    }, [confirmEmail]);

    return (
        <>
            <Paper>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // submit form logic here. since it's a "forgot password" form,
                        // typically you would send a reset password link to the email provided.
                        console.log('Form submitted with email:', confirmEmail);
                    }}
                    className="mb-0 m-auto mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white max-w-xl"
                >
                    <h1 className="font-bold text-xl text-purple-800">Forgot Password</h1>
                    <div className="mb-6">
                        <Input
                            type='email'
                            valid={emailError !== null}
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
                        <Button type="submit" disabled={isButtonDisabled}>
                            Send
                        </Button>
                    </div>
                </form>
                <p className="text-center mt-6 text-gray-500 text-xs">
                    &copy; 2024 Compass Center
                </p>
            </Paper>
        </>
    );
}
