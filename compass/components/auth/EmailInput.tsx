import React, { useState } from 'react';
import Input from '@/components/Input'
import { InputProps } from '@/utils/classes/InputProps';

const EmailInput: React.FunctionComponent<InputProps> = ({ type, title, placeholder, ...rest }) => {

  return (
    <Input
      type='email'
      title="Enter your email address"
      placeholder="janedoe@gmail.com"
      iconKey={'EmailInputIcon'}
    />
  );
};

export default EmailInput;
