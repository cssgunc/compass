import { InputHTMLAttributes } from "react";
import { Icons } from "../constants";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    iconKey?: keyof typeof Icons; // Use keyof typeof to ensure the key exists in Icons
    title?: string; // Assuming title is always a string
    type?: string;
    placeholder?: string;
  };