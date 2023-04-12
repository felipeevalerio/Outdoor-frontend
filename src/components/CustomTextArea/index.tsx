import { TextareaHTMLAttributes } from "react";
import { CustomTextAreaContainer } from "./styles";

interface ICustomTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    register: any
}

export function CustomTextArea({register, ...props}: ICustomTextAreaProps) {
    return (
        <CustomTextAreaContainer {...register(props.id)} {...props}/>
    );
}