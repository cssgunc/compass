"use client"
import Button from '@/components/Button';
import Input from '@/components/Input'
import InlineLink from '@/components/InlineLink';
import Paper from '@/components/auth/Paper';
import { useState, useEffect } from 'react';

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
        return 'Email cannot be empty';
    } else if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }
    else{
        return 'If your email exists in the database, you should receive a password reset in your inbox.'
    }

}

export default function Page()  {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [confirmEmail, setconfirmEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const error = isValidEmail(confirmEmail);
        setEmailError(error);
        setIsButtonDisabled(error !== null && !error.includes('exists in the database'));
    }, [confirmEmail]);

    return (
        <>
            <Paper>
                <form
                className="mb-0 mt-6 mb-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
                    <h1 className="text-2xl font-bold text-purple-700 sm:text-3xl">Forgot password</h1>
                    <div className="mb-4">
                        <Input type='email'
                        title="Enter your email address"
                        placeholder="janedoe@gmail.com"
                        value={confirmEmail}
                        iconKey={'EmailInputIcon'}
                        onChange={(e) => {
                            setconfirmEmail(e.target.value);
                            setEmailError(''); // Reset the error when the user types
                        }}/>
                        {emailError && (
                        <p className={`mt-2 ${emailError.includes('exists in the database') ? 'text-green-500' : 'text-red-500'}`}>
                            {emailError}
                            </p>
                            )}
                    </div>
                    <div className="flex flex-col items-left space-y-4">
                        <InlineLink href="/login">
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
};

