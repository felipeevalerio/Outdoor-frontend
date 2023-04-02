import { ReactNode, FormHTMLAttributes } from "react";
import { CloseButton, Content, Overlay } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
}

export function Form({children, ...props}: IFormProps) {
    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <form {...props}>
                    {children}
                </form>

                <CloseButton >
                    <X size={18} />
                </CloseButton>
            </Content>
        </Dialog.Portal>
    )
}