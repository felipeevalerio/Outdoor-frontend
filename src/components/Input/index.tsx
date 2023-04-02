import { InputHTMLAttributes } from "react";
import { InputContainer } from "./styles";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    register: any
}

export function Input({register, ...props}: IInputProps) {
    return (
        <InputContainer {...register(props.id)} {...props}/>
    )
}