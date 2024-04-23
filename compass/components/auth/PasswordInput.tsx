import React, {
    useState,
    FunctionComponent,
    ChangeEvent,
    ReactNode,
} from "react";
import Input from "../Input"; // Adjust the import path as necessary
import { Icons } from "@/utils/constants";

type PasswordInputProps = {
    title?: ReactNode; // Assuming you might want to reuse title, placeholder etc.
    placeholder?: ReactNode;
    valid?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput: FunctionComponent<PasswordInputProps> = ({
    onChange,
    valid = true,
    ...rest
}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const PasswordIcon = visible
        ? Icons["HidePasswordIcon"]
        : Icons["UnhidePasswordIcon"];

    // Render the Input component and pass the PasswordIcon as an icon prop
    return (
        <Input
            {...rest}
            type={visible ? "text" : "password"}
            onChange={onChange}
            valid={valid}
            icon={
                <PasswordIcon className="h-5 w-5" onClick={toggleVisibility} />
            }
        />
    );
};

export default PasswordInput;
