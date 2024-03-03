"use client"
import Button from '@/components/Button';
import Input from '@/components/Input'
import InlineLink from '@/components/InlineLink';
import Paper from '@/components/auth/Paper';
import { useState, useEffect } from 'react';

function isValidEmail(email: string) {
    //check email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
        //check if input is empty
        return 'Email cannot be empty';
    } else if (!emailRegex.test(email)) {
        //check for incorrect email format
        return 'Invalid email format';
    }
    else{
        //return message for no error in input
        return 'If your email exists in the database, you should receive a password reset in your inbox.'
    }

}

export default function Page()  {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [confirmEmail, setconfirmEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        //when email string inputted it is checked in isValidEmail
        const error = isValidEmail(confirmEmail);
        setEmailError(error);
        //button is disabled if any error is detected
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
                        //setting a placeholder in the email input box
                        value={confirmEmail}
                        icon={'EmailInputIcon'}
                        onChange={(e) => {
                            setconfirmEmail(e.target.value);
                        }}/>
                        {emailError && (
                        <p className={`mt-2 ${emailError.includes('exists in the database') ? 'text-green-500' : 'text-red-500'}`}>
                            {emailError}
                            </p>
                            //if email does not meet certain criteria, then issue an error
                            )}
                    </div>
                    <div className="flex flex-col items-left space-y-4">
                        <InlineLink href= "/auth/login"> {/* link back to login page */}
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

