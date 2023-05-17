import { ButtonHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'purple' |  'green' | 'red'
}

export function Button({ variant = 'purple', children, ...props }: IButtonProps) {
    return (
        <ButtonContainer variant={variant} {...props} >
            {children}
        </ButtonContainer>
    )
}