// pages/index.tsx
"use client";
import { useState, useEffect } from 'react'; 
import Button from '@/components/Button';
import Input from '@/components/Input';
import Paper from '@/components/auth/Paper';


function isStrongPassword(password: string): boolean {
 const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
 return strongPasswordRegex.test(password);
}


export default function Page() {
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [valid, setValid] = useState(false);
 const [matching, setMatching] = useState(false);
 const [isButtonDisabled, setIsButtonDisabled] = useState(true);

 useEffect(() => {
    setValid(isStrongPassword(newPassword))
    setMatching(newPassword === confirmPassword)
 }, [newPassword, confirmPassword])

 useEffect(() => {
    setIsButtonDisabled(newPassword === '' || confirmPassword === '' || !matching || !valid);
    console.log(matching)
    console.log(valid)
    console.log('newPasswordDisabledTest',isButtonDisabled)
  }, [matching, valid]);


 return (
   <>
     <Paper>
       <form
         onSubmit={(e) => {
           e.preventDefault();
           if (newPassword === confirmPassword) {
               console.log('Passwords match. Submitting form...');
             } else {
               console.log('Passwords do not match. Please try again.');
             }
         }}
         className="mb-0 mt-6 mb-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
       >
         <div className="text-center sm:text-left">
           <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">New Password</h1>
         </div>
         <div className="mb-4">
           <Input
               type="password"
               title="Enter New Password"
               value={newPassword}
               onChange={(e) => {
               setNewPassword(e.target.value);
               }}
           />
         </div>
         <div className="mb-6">
           <Input
               type="password"
               title="Confirm Password"
               value={confirmPassword}
               onChange={(e) => {
               setConfirmPassword(e.target.value);
               }}
           />
         </div>
         <div className="flex flex-col items-left space-y-4">
            <Button type="submit" disabled={isButtonDisabled} >
             Send
           </Button>
         </div>
       </form>
       <p className="text-center mt-6 text-gray-500 text-xs">&copy; 2024 Compass Center</p>
     </Paper>
   </>
 );
}



